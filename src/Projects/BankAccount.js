
import { useReducer } from "react";
import "../Css/BankAccount.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
/*
TALİMATLAR / DİKKAT EDİLECEK HUSUSLAR:

1. Basit bir banka hesabı uygulayalım! useReducer'ın nasıl çalıştığını açıklamak için benzetme olarak kullandığım örneğe benzer, ancak basitleştirilmiştir (burada hesap numaralarını kullanmıyoruz)

2. Aşağıdaki durum geçişlerini modellemek için bir azaltıcı kullanın: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount.Başlamak için aşağıdaki `initialState'i kullanın.

3. Tüm işlemler (hesap açma hariç) yalnızca isActive true ise gerçekleştirilebilir. Değilse, sadece orijinal durum nesnesini döndürün. Bunu reducer'ın hemen başında kontrol edebilirsiniz

4. Hesap açıldığında, isActive değeri true olarak ayarlanır. Ayrıca bir hesap açmak için minimum 500 depozito tutarı vardır (bu, bakiyenin 500'den başlayacağı anlamına gelir)

5. Müşteri yalnızca henüz kredi yoksa kredi talebinde bulunabilir. Bu koşul karşılanırsa, talep edilen tutar 'kredi' durumuna kaydedilecek ve bakiyeye eklenecektir. Koşul karşılanmazsa, sadece mevcut durumu döndürün

6. Müşteri krediyi ödediğinde, tam tersi olur: para bakiyeden alınır ve 'kredi' 0'a geri döner. Bu negatif bakiyelere yol açabilir, ancak bu sorun değildir, çünkü müşteri artık hesabını kapatamaz (bir sonraki noktaya bakın)

7. Müşteri bir hesabı yalnızca kredi yoksa VE bakiye sıfırsa kapatabilir. Bu koşul karşılanmazsa, sadece durumu döndürün. Koşul karşılanırsa, hesap devre dışı bırakılır ve tüm para çekilir. Hesap temel olarak başlangıç durumuna geri döner
*/
const initialState = {
    balance: 0,
    loan: 0,
    isActive: false
};

function reducer(state, action) {


    switch (action.type) {
        case "openAccount":
            return {
                ...state,
                balance: 500,
                isActive: true
            };
        case "deposit":
            return {
                ...state,
                balance: state.balance + action.payload

            };
        case "withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case "requestLoan":
            if (state.loan === 5000) return state;
            return {
                ...state,
                loan: action.payload,
                balance: state.balance + action.payload
            }
        case "payLoan":
            return {
                ...state,
                loan: 0,
                balance: state.balance - state.loan
            }
        case "closeAccount":
            if (state.loan > 0 || state.balance !== 0) return state;
            return {
                initialState
            }
        default:
            throw new Error("Unkown");

    }

}

export default function BankAccount() {

    const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="BankAccount">
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>
            <p>
                <button onClick={() => dispatch({ type: "openAccount" })} disabled={isActive}>
                    Open account
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: "deposit", payload: 150 })} disabled={!isActive}>
                    Deposit 150
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: "withdraw", payload: 50 })} disabled={!isActive}>
                    Withdraw 50
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: "requestLoan", payload: 5000 })} disabled={!isActive}>
                    Request a loan of 5000
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: "payLoan" })} disabled={!isActive}>
                    Pay loan
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({ type: "closeAccount" })} disabled={!isActive}>
                    Close account
                </button>
            </p>
        </div>
    );
}
