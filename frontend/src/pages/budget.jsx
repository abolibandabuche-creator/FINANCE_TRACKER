import useTransactionStore from "../zustandstore/transactionstore"
import usebudgetstore from "../zustandstore/budgetstore"
import AddBudget from "../components/budget/addbudget.jsx"
import ViewBudget from "../components/budget/viewbudget.jsx"

function Budget() {
    return (
        <div className="budget-page">
            <div className="budget-top-row">
                <h1>Budget</h1>
                <AddBudget />
            </div>
            <ViewBudget />
        </div>
    )
}

export default Budget