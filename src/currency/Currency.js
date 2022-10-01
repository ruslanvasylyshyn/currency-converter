import React from "react";
import "../currency/currency.css";

export default function Currency(props) {
  return (
    <div className="currencyConverter-wrapper">
      <input
        type="number"
        min="0"
        value={props.amount}
        onChange={(event) => props.onAmountChange(event.target.value)}
      />
      <select
        value={props.currency}
        onChange={(event) => props.onCurrencyChange(event.target.value)}
      >
        {props.currencies.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
