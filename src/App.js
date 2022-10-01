import React, { useEffect, useState } from "react";
import "./App.css";
import Currency from "./currency/Currency";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(2);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);
  console.log(rates.length === 0);

  // Requesting and receiving data
  useEffect(() => {
    fetch("https://cdn.cur.su/api/nbu.json")
      .then((response) => response.json())
      .then((result) => {
        setRates(result.rates);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // Data calculation
  useEffect(() => {
    if (rates) {
      handlerAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handlerAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handlerCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handlerAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handlerCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div className="App">
      {rates.length === 0 ? <div className="currencyRates-notAvailable">Курс недоступний</div> : 
      <>
        <div className="currencyRates">
          <div className="currencyRates-USD">
            <h2>USD/UAH</h2>
            {rates.UAH} грн
          </div>
          <div className="currencyRates-EUR">
            <h2>EUR/UAH</h2>
            {format(rates.UAH / rates.EUR)} грн
          </div>
        </div>

        <h2 className="currencyConverter-header">Currency converter</h2>
        <Currency
          onAmountChange={handlerAmount1Change}
          onCurrencyChange={handlerCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <span className="currencyEqual">=</span>
        <Currency
          onAmountChange={handlerAmount2Change}
          onCurrencyChange={handlerCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </>}
    </div>
  );
}

export default App;
