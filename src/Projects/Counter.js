import React, { useState } from 'react';
import "../Css/Counter.css";

function Counter(props) {

    const [count, setCount] = useState(0);
    const [step, setStep] = useState(0);

    function handleReset() {
        setCount(0);
        setStep(0);
    }
    const date = new Date();
    date.setDate(date.getDate() + count);
    return (
        <div className='main'>
            <div ><input type="range" min="0" max="10" value={step} onChange={(e) => setStep(Number(e.target.value))}></input><span>{step}</span>

                <div className='container'>
                    <div className='element'>
                        <button onClick={() => setCount((c) => c - step)}>-</button>
                    </div>
                    <div className='element' style={{ border: "1px solid gray" }}>
                        <input type="text" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                        </input>
                    </div>
                    <div className='element'>
                        <button onClick={() => setCount((c) => c + step)}>+</button>
                    </div>
                </div>
                <p>
                    <span>
                        {count === 0 ? "Bugün " : count > 0 ? `${count} gün sonra ` : `${Math.abs(count)} gün önce `}
                    </span>
                    {date.toDateString()}
                </p>
                {count !== 0 || step !== 0 ? <button onClick={handleReset}>Sıfırla</button> : null}

            </div>



        </div>
    );
}

export default Counter;