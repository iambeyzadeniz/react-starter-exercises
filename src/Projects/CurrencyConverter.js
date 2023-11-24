
import { useEffect, useState } from "react";
import "../Css/CurrencyConverter.css";
export default function CurrencyConverter() {

    const [amount, setAmount] = useState(1);
    const [fromCur, setFromCur] = useState("USD");
    const [toCur, setToCur] = useState("TRY");
    const [converted, setConverted] = useState("");

    useEffect(function () {
        async function fetchCurrency() {
            const res = await fetch(
                `http://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
            );
            const data = await res.json();
            setConverted(data.rates[toCur]);
        }
        if (fromCur === toCur) return setConverted(amount);
        fetchCurrency();
    }, [amount, toCur, fromCur])

    return (
        <div className="main">
            <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>

            </select>
            <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>

            </select>
            <p>{converted} {toCur}</p>
        </div>
    );
}
