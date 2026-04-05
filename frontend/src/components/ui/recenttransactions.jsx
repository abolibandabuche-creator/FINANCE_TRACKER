import categoryIcons from "../../utilities/categoryicons"
import useTransactionStore from "../../zustandstore/transactionstore"
import removetrailingzeroes from "../../utilities/removetrailingzeroes.jsx"
import transactionssearch from "../../utilities/search.jsx"
import { useState } from "react"
function Recenttransactions() {
    const transactions = useTransactionStore((state) => state.transactions)
    const [tracker, settracker] = useState("")
    const filtered = tracker != "" ? transactionssearch(transactions, tracker) : transactions
    const recent = [...filtered].reverse().slice(0, 5)
    function trackerfunc(event) {
        const { value } = event.target
        settracker(value)

    }
    return (
        <div className="recent-container">
            <p className="recent-title">Recent Transactions</p>
            {recent.map(t => (
                <div key={t.rawDate} className={t.type === "income" ? "recent-card income-recent" : "recent-card expense-recent"}>
                    <div className="recent-icon-wrap">
                        {categoryIcons[t.category]}
                    </div>
                    <div className="recent-left">
                        <span className="recent-description">{t.description}</span>
                        <span className="recent-category">{t.category}</span>
                    </div>
                    <div className="recent-right">
                        <span className="recent-amount">{t.type === "income" ? "+" : "-"}₹{removetrailingzeroes(Number(t.amount).toFixed(2))}</span>
                        <span className="recent-date">{t.date.split(",")[0].split(" ").slice(0, 2).join(" ")}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Recenttransactions