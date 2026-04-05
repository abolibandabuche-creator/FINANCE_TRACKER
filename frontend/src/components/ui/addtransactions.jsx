import { toast } from "sonner"
import { useState } from "react"
import { incomeCategories, expenseCategories } from "../../utilities/categories.jsx"
import useTransactionStore from "../../zustandstore/transactionstore.jsx"
function addtransactions() {
    const transactions = useTransactionStore((state) => state.transactions)
    const addtransactions = useTransactionStore((state) => state.addtransactions)
    const setmodal = useTransactionStore((state) => state.setmodal)
    const setupdated = useTransactionStore((state) => state.setupdated)
    const updated = useTransactionStore((state) => state.updated)
    function modalfunc() {
        setmodal(false)
    }
    const [tracker, settracker] = useState({
        description: "",
        amount: "",
        category: "",
        type: "",
        date: ""
    })
    const [on, seton] = useState(true)
    function handleSubmit(event) {
        event.preventDefault();
        // Frontend 'required' only blocks UI interactions,Users can still call the API manually with invalid fields, so we validate everything here as well.ideally these validations are done in the backend through zod but for a frontend only project it shud be done here

        if (!tracker.description.trim()) {
            toast.error("Please enter a description.");
            return;
        }
        if (isNaN(Number(tracker.amount))) {
            toast.error("Amount must be a valid number.");
            return;
        }
        if (!tracker.amount || Number(tracker.amount) <= 0) {
            toast.error("Enter a valid amount greater than 0.");
            return;
        }
        if (tracker.type !== "income" && tracker.type !== "expense") {
            toast.error("Select a transaction type.");
            return;
        }

        if (!tracker.category) {
            toast.error("Please pick a category.");
            return;
        }
        if (tracker.type === "income" && !incomeCategories.includes(tracker.category)) {
            toast.error("Invalid category selected for income")
            return;
        }
        if (tracker.type === "expense" && !expenseCategories.includes(tracker.category)) {
            toast.error("invalid category selected for expense")
            return;
        }
        const fulltransactionobj = {
            ...tracker, date: new Date().toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }), rawDate: new Date().toISOString()
        }
        addtransactions(fulltransactionobj)
        const existingtransactions = JSON.parse(localStorage.getItem("transactions") || "[]")
        existingtransactions.push(fulltransactionobj)
        localStorage.setItem("transactions", JSON.stringify(existingtransactions))
        setupdated(!updated)
        console.log(transactions)
        toast.success("Transaction added!");
        console.log("Submitted:", tracker);
        settracker({
            description: "",
            amount: "",
            category: "",
            type: ""
        });
        seton(true);
    }
    function trackerfunc(event) {
        const { name, value } = event.target
        if (name === "type") {
            seton(false)
        }
        settracker((prev) => ({ ...prev, [name]: value }))
    }
    return (<>
        <button onClick={modalfunc}>X</button>
        <form onSubmit={handleSubmit}>
            <label>Description</label>
            <input type="text" name="description" onChange={trackerfunc} value={tracker.description} />
            <label >Amount(₹)</label>
            <input type="number" min="0.1" step="any" name="amount" onChange={trackerfunc} value={tracker.amount} />

            <label>Transaction Type</label>
            <select name="type" onChange={trackerfunc} value={tracker.type} >
                <option value="">Select Category</option>
                <option value="expense">💸 Expense</option>
                <option value="income">💰 Income</option>
            </select>
            <label >Category</label>
            {tracker.type === "income" ? (
                <select name="category" value={tracker.category} onChange={trackerfunc} disabled={on} >
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
                <select name="category" value={tracker.category} onChange={trackerfunc} disabled={on} >
                    <option value="">Select Category</option>
                    <optgroup label="Essential">
                        <option value="Housing">🏠 Housing / Rent</option>
                        <option value="Groceries">🛒 Groceries</option>
                        <option value="Utilities">⚡ Utilities</option>
                        <option value="Transport">🚌 Transport</option>
                        <option value="Health">💊 Health / Medical</option>
                    </optgroup>
                    <optgroup label="Lifestyle">
                        <option value="Food">🍕Food</option>
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
            <button type="submit">ADD TRANSACTION</button>
        </form>

    </>)


}









export default addtransactions