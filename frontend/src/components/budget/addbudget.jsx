import { useState } from "react"
import { expenseCategories } from "../../utilities/categories.jsx"
import usebudgetstore from "../../zustandstore/budgetstore"
import { toast } from "sonner"

function AddBudget() {
    const setbudget = usebudgetstore((state) => state.setbudget)
    const budget = usebudgetstore((state) => state.budget)
    const [modal, setmodal] = useState(false)
    const [tracker, settracker] = useState({ category: "", limit: "" })

    function handlesubmit() {
        if (!tracker.category) return toast.error("Please select a category")
        if (!tracker.limit || Number(tracker.limit) <= 0) return toast.error("Enter a valid limit")
        if (budget[tracker.category]) return toast.error("Budget for this category already exists")
        setbudget(tracker.category, Number(tracker.limit))
        toast.success("Budget added!")
        settracker({ category: "", limit: "" })
        setmodal(false)
    }

    function trackerfunc(event) {
        const { name, value } = event.target
        settracker((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <button className="add-transaction-btn" onClick={() => setmodal(true)}>
                + Add Budget
            </button>

            {modal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button onClick={() => setmodal(false)}>✕</button>
                        <h2 style={{ fontSize: "16px", fontWeight: 500 }}>Add Budget</h2>

                        <div>
                            <label>Category</label>
                            <select name="category" value={tracker.category} onChange={trackerfunc}>
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
                        </div>

                        <div>
                            <label>Monthly Limit (₹)</label>
                            <input
                                type="number"
                                name="limit"
                                min="1"
                                value={tracker.limit}
                                onChange={trackerfunc}
                                placeholder="e.g. 5000"
                            />
                        </div>

                        <button type="submit" onClick={handlesubmit}>Add Budget</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddBudget