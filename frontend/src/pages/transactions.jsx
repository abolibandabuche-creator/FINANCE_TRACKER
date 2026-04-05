import formatter from "../utilities/formatter.jsx"
import { CircleX, Pencil } from "lucide-react"
import useTransactionStore from "../zustandstore/transactionstore.jsx"
import { useState } from "react"
import transactionssearch from "../utilities/search.jsx"
import transactionsfilter from "../utilities/filter.jsx"
import { toast } from "sonner"
import { incomeCategories, expenseCategories } from "../utilities/categories.jsx"
function Transactions() {
    const transactions = useTransactionStore((state) => state.transactions)
    const deletetransactions = useTransactionStore((state) => state.deletetransactions)
    const admin = useTransactionStore((state) => state.admin)
    const [tracker, settracker] = useState("")
    const edittransaction = useTransactionStore((state) => state.edittransaction)
    const [editingTransaction, setEditingTransaction] = useState(null)
    const [filtertracker, setfiltertracker] = useState({
        newest: false,
        oldest: false,
        highest: false,
        lowest: false
    })
    let filtered = tracker != "" ? transactionssearch(transactions, tracker) : transactions
    filtered = (filtertracker.newest || filtertracker.oldest || filtertracker.highest || filtertracker.lowest) ? transactionsfilter(filtered, filtertracker) : filtered
    function handleeditopen(t) {
        setEditingTransaction(t)
    }
    function handleeditsave() {
        if (editingTransaction.amount === "" || editingTransaction.category === "" || editingTransaction.type === "" || editingTransaction.description === "") {
            return toast.error("Unable to change to empty fields")
        }
        edittransaction(editingTransaction.rawDate, editingTransaction)
        const updated = transactions.map(t =>
            t.rawDate === editingTransaction.rawDate ? editingTransaction : t
        )
        localStorage.setItem("transactions", JSON.stringify(updated))
        setEditingTransaction(null)
    }
    function handledelete(value) {
        deletetransactions(value)
        const updated = transactions.filter(t => t.rawDate !== value)
        localStorage.setItem("transactions", JSON.stringify(updated))
    }
    function trackerfunc(event) {
        const { value } = event.target
        settracker(value)
    }
    function filterfunc(event) {
        const { name } = event.target
        setfiltertracker((prev) => ({ ...prev, [name]: !prev[name] }))
    }
    return (
        <div className="transactions-page">
            <div className="transactions-controls">
                <button name="newest" className={`sort-btn ${filtertracker.newest ? "active" : ""}`} onClick={filterfunc} disabled={filtertracker.oldest}>Newest</button>
                <button name="oldest" className={`sort-btn ${filtertracker.oldest ? "active" : ""}`} onClick={filterfunc} disabled={filtertracker.newest}>Oldest</button>
                <button name="highest" className={`sort-btn ${filtertracker.highest ? "active" : ""}`} onClick={filterfunc} disabled={filtertracker.lowest}>Highest</button>
                <button name="lowest" className={`sort-btn ${filtertracker.lowest ? "active" : ""}`} onClick={filterfunc} disabled={filtertracker.highest}>Lowest</button>
                <button className="export-btn" onClick={() => exportcsv(transactions)}>Export CSV</button>
            </div>
            <input type="text" className="search-input" onChange={trackerfunc} placeholder="Search transactions..." />
            <div className="transactions-container">
                {filtered.map((t) => (
                    <div key={t.rawDate} className={t.type === "income" ? "income-card" : "expense-card"}>
                        {admin && (
                            <>
                                <div className="delete-btn" onClick={() => handledelete(t.rawDate)}>
                                    <CircleX size={26} color="#A32D2D" />
                                </div>
                                <div className="edit-btn" onClick={() => handleeditopen(t)}>
                                    <Pencil size={22} color="#7ab3e8" />
                                </div>
                            </>
                        )}
                        <div className="card-left">
                            <span className="card-description">{t.description}</span>
                            <span className="card-category">{t.category}</span>
                            <span className="card-date">{t.date}</span>
                        </div>
                        <div className="card-right">
                            <span className="card-amount">{t.type === "income" ? "+" : "-"}₹{formatter(t.amount)}</span>
                            <span className="card-badge">{t.type}</span>
                        </div>
                    </div>
                ))}
                {editingTransaction && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <button onClick={() => setEditingTransaction(null)}>✕</button>
                            <h2 style={{ fontSize: "16px", fontWeight: 500 }}>Edit Transaction</h2>

                            <div>
                                <label>Description</label>
                                <input
                                    value={editingTransaction.description}
                                    onChange={(e) => setEditingTransaction(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label>Amount</label>
                                <input
                                    type="number"
                                    value={editingTransaction.amount}
                                    onChange={(e) => setEditingTransaction(prev => ({ ...prev, amount: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label>Type</label>
                                <select
                                    value={editingTransaction.type}
                                    onChange={(e) => setEditingTransaction(prev => ({ ...prev, type: e.target.value, category: "" }))}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label>Category</label>
                                {editingTransaction.type === "income" ? (
                                    <select
                                        value={editingTransaction.category}
                                        onChange={(e) => setEditingTransaction(prev => ({ ...prev, category: e.target.value }))}
                                    >
                                        <option value="">Select Category</option>
                                        <optgroup label="Income">
                                            <option value="Salary">💰 Salary</option>
                                            <option value="Freelance">💻 Freelance</option>
                                            <option value="Business">🏢 Business</option>
                                            <option value="Investments">📈 Investments</option>
                                            <option value="Rental Income">🏠 Rental Income</option>
                                            <option value="Bonus">🎯 Bonus</option>
                                            <option value="Gift">🎁 Gift Received</option>
                                            <option value="Refund">↩️ Refund</option>
                                            <option value="Side Hustle">⚡ Side Hustle</option>
                                            <option value="Other Income">💵 Other Income</option>
                                        </optgroup>
                                    </select>
                                ) : (
                                    <select
                                        value={editingTransaction.category}
                                        onChange={(e) => setEditingTransaction(prev => ({ ...prev, category: e.target.value }))}
                                    >
                                        <option value="">Select Category</option>
                                        <optgroup label="Essential">
                                            <option value="Housing">🏠 Housing / Rent</option>
                                            <option value="Groceries">🛒 Groceries</option>
                                            <option value="Utilities">⚡ Utilities</option>
                                            <option value="Transport">🚌 Transport</option>
                                            <option value="Health">💊 Health / Medical</option>
                                        </optgroup>
                                        <optgroup label="Lifestyle">
                                            <option value="Food">🍕 Food</option>
                                            <option value="Entertainment">🎬 Entertainment</option>
                                            <option value="Shopping">🛍️ Shopping</option>
                                            <option value="Subscriptions">📱 Subscriptions</option>
                                            <option value="Education">🎓 Education</option>
                                        </optgroup>
                                        <optgroup label="Other">
                                            <option value="Travel">✈️ Travel</option>
                                            <option value="Fitness">💪 Fitness / Gym</option>
                                            <option value="Family">👨‍👩‍👧 Family</option>
                                            <option value="Gifts">🎁 Gifts</option>
                                            <option value="Miscellaneous">📦 Miscellaneous</option>
                                        </optgroup>
                                    </select>
                                )}
                            </div>

                            <button type="submit" onClick={handleeditsave}>Save Changes</button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )


}






export default Transactions