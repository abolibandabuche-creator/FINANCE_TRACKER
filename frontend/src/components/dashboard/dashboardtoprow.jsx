import useTransactionStore from "../../zustandstore/transactionstore.jsx"
import { gettotalbalance, getsavingsrate, gettotalexpense, gettotalincome } from "../../utilities/statcardcalculations"
import Statcard from "../ui/statcard.jsx"
import usebudgetstore from "../../zustandstore/budgetstore"
import budgetexceeded from "../../utilities/budgetexceeded"
function dashboardtoprow() {

    const transactions = useTransactionStore((state) => state.transactions)
    const budget = usebudgetstore((state) => state.budget)
    const exceeded = budgetexceeded(transactions, budget)
    return (
        <div className="dashboard-top-row">
            <Statcard
                className="stat-card exceeded"
                heading="BUDGETS EXCEEDED"
                amount={exceeded} suffix=":"
            />
            <Statcard className="stat-card balance" heading="TOTAL BALANCE" amount={gettotalbalance(transactions)} />
            <Statcard className="stat-card income" heading="INCOME" amount={gettotalincome(transactions)} />
            <Statcard className="stat-card expense" heading="EXPENSE" amount={gettotalexpense(transactions)} />
            <Statcard className="stat-card savings" heading="SAVINGS RATE" amount={getsavingsrate(transactions)} suffix="%" />
        </div>
    )




}

export default dashboardtoprow

