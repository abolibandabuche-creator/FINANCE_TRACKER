import usebudgetstore from "../../zustandstore/budgetstore.jsx"
import useTransactionStore from "../../zustandstore/transactionstore.jsx"
import ProgressBar from "./progressbar.jsx"
import dashboardbudgetbars from "../../utilities/dashboardbudgetbars.jsx"

function DashboardBudgetSection() {
    const budget = usebudgetstore((state) => state.budget)
    const transactions = useTransactionStore((state) => state.transactions)
    const bars = dashboardbudgetbars(transactions, budget)

    if (bars.length === 0) return null  // hide entire section if nothing to show

    return (
        <div className="chart-card">
            <p className="chart-title">Budget Overview</p>
            <div className="dashboard-budget-bars">
                {bars.map(({ category, limit, spent }) => (
                    <div key={category} className="dashboard-budget-row">
                        <div className="dashboard-budget-label">
                            <span className="dashboard-budget-category">{category}</span>
                            <span className="dashboard-budget-limit">₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}</span>
                        </div>
                        <ProgressBar spent={spent} limit={limit} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardBudgetSection