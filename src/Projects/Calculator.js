import React, { useState } from 'react';

function Calculator(props) {
    return (
        <div>
            <TipCalculator />
        </div>
    );
}

export default Calculator;

function TipCalculator() {
    const [bill, setBill] = useState("");
    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);

    const tip = bill * ((percentage1 + percentage2)) / 2 / 100

    function handleReset() {

        setBill("");
        setPercentage1(0);
        setPercentage2(0);
    }
    return (
        <div>
            <BillInput bill={bill} onSetBill={setBill} />
            <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>Yemeği sen nasıl buldun ?</SelectPercentage>
            <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>Yemeği arkadaşın nasıl buldu ?</SelectPercentage>
            {bill > 0 && (<>
                <Output bill={bill} tip={tip} />
                <Reset onResetBill={handleReset} /> </>)}
        </div>
    );
}

function BillInput({ bill, onSetBill }) {
    return <div>
        <label>Hesap tutarı ne kadar ?</label>
        <input type="text"
            placeholder='Tutar'
            value={bill}
            onChange={(e) => onSetBill(Number(e.target.value))}
        ></input>
    </div>


}

function SelectPercentage({ children, percentage, onSelect }) {
    console.log(percentage);
    return <div>
        <label>{children}</label>
        <select value={percentage} onChange={(e) => onSelect(Number(e.target.value))}>
            <option value="0">İyi değildi (0%)</option>
            <option value="5">İdare eder (5%)</option>
            <option value="10">Güzel (10%)</option>
            <option value="20">Çok başarılı (20%)</option>
        </select>
    </div>
}

function Output({ bill, tip }) {
    return <h3> Ödemen gereken {bill + tip} ( ${bill} + ${tip} Bahşiş)</h3>
}

function Reset({ onResetBill }) {
    return <button onClick={onResetBill}>Sıfırla</button>
}
