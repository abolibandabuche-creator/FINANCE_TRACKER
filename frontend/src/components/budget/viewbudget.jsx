import { useState } from "react"
import usebudgetstore from "../../zustandstore/budgetstore"
import useTransactionStore from "../../zustandstore/transactionstore"
import ProgressBar from "../ui/progressbar.jsx"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"

function ViewBudget() {
    const budget = usebudgetstore((state) => state.budget)
    const setbudget = usebudgetstore((state) => state.setbudget)
    const deletebudget = usebudgetstore((state) => state.deletebudget)
    const transactions = useTransactionStore((state) => state.transactions)
    const [editingCategory, setEditingCategory] = useState(null)
    const [newlimit, setnewlimit] = useState("")

    const thismonth = new Date().getMonth()

    function getspent(category) {
        return transactions
            .filter(t =>
                t.type === "expense" &&
                t.category === category &&
                new Date(t.rawDate).getMonth() === thismonth
            )
            .reduce((sum, t) => sum + Number(t.amount), 0)
    }

    function handleeditsave(category) {
        if (!newlimit || Number(newlimit) <= 0) return toast.error("Enter a valid limit")
        setbudget(category, Number(newlimit))
        toast.success("Budget updated!")
        setEditingCategory(null)
        setnewlimit("")
    }

    function handledelete(category) {
        deletebudget(category)
        toast.success("Budget removed!")
    }

    const entries = Object.entries(budget)

    if (entries.length === 0) {
        return <p style={{ color: "#888", fontSize: "14px" }}>No budgets set yet.</p>
    }

    return (
        <div className="budget-grid">
            {entries.map(([category, limit]) => {
                const spent = getspent(category)
                const exceeded = spent > limit

                return (
                    <div key={category} className={`budget-card ${exceeded ? "budget-exceeded" : ""}`}>
                        <div className="budget-card-header">
                            <span className="budget-category">{category}</span>
                            <div className="budget-actions">
                                <Pencil
                                    size={15}
                                    color="#7ab3e8"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { setEditingCategory(category); setnewlimit(limit) }}
                                />
                                <Trash2
                                    size={15}
                                    color="#F09595"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handledelete(category)}
                                />
                            </div>
                        </div>

                        {exceeded && (
                            <span className="budget-exceeded-badge">⚠ Limit exceeded</span>
                        )}

                        <ProgressBar spent={spent} limit={limit} />

                        <span className="budget-limit">Limit: ₹{limit.toLocaleString()}</span>

                        {editingCategory === category && (
                            <div className="budget-edit-row">
                                <input
                                    type="number"
                                    value={newlimit}
                                    min="1"
                                    onChange={(e) => setnewlimit(e.target.value)}
                                    placeholder="New limit"
                                />
                                <button onClick={() => handleeditsave(category)}>Save</button>
                                <button onClick={() => setEditingCategory(null)}>Cancel</button>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ViewBudget