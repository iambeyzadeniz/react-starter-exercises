import React, { useState } from 'react';
import "../Css/CardChange.css";

export default function CardChange() {
    return (
        <div className="App">
            <FlashCards />
        </div>
    );
}

const questions = [
    {
        id: 3457,
        question: "Dünya'nın en büyük okyanusu hangisidir?",
        answer: " Pasifik Okyanusu"
    },
    {
        id: 7336,
        question: "Hangi gezegen Güneş Sistemi'nde yer alır ve Kırmızı Gezegen olarak bilinir?",
        answer: "MARS"
    },
    {
        id: 8832,
        question: "Dünya'nın en yüksek dağı nedir?",
        answer: "Everest Dağı"
    },
    {
        id: 1297,
        question: "Bileşenlere veri iletmek için kullanılan özellikler?",
        answer: "Props"
    },
    {
        id: 9103,
        question: "JavaScript ve XML'in birleşimi, React bileşenlerini tanımlamak için kullanılır?",
        answer: "JSX"
    },
    {
        id: 2002,
        question: " Bileşenlerin kendi içinde sakladığı değiştirilebilir veriler?",
        answer: "State"
    }
];

function FlashCards() {

    const [selectedId, setSelectedId] = useState(null);
    function handleClick(id) {
        setSelectedId(id !== selectedId ? id : null);
    }

    return (

        <div className='flashcards'>
            {questions.map((question) => (
                <div
                    onClick={() => handleClick(question.id)}
                    key={question.id}
                    className={question.id === selectedId ? "selected" : ""}>
                    <p>{question.id === selectedId ? question.answer : question.question}</p>
                </div>
            ))}
        </div>
    );
}