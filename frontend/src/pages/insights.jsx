import Statcard from "../components/ui/statcard.jsx"
import { averagespend, monthlycomparison, mostfrequentcategory, highestspendingcategory } from "../utilities/insightscalculator"
import useTransactionStore from "../zustandstore/transactionstore.jsx"
function insights() {
    const transactions = useTransactionStore((state) => state.transactions)
    const obj = highestspendingcategory(transactions)
    const frequentobj = mostfrequentcategory(transactions)
    return (<>
        <div className="insights-page">
            <Statcard variant="insight" heading="HIGHEST SPENDING CATEGORY" className="insight-card insight-highest " text={obj.category} icon="📊" amount={obj.amount} />
            <Statcard variant="insight" heading="YOUR DAILY EXPENSE ON AVERAGE" icon="⌀" className="insight-card insight-average" amount={averagespend(transactions)} />
            <Statcard variant="insight" heading="LAST MONTH VS THIS MONTH" icon="📅" className="insight-card insight-monthly" text={monthlycomparison(transactions)} />
            <Statcard variant="insight" heading="MOST FREQUENT CATEGORY" className="insight-card insight-frequent" text={frequentobj.text} icon="🔁" amount={frequentobj.amount} />
        </div>
    </>)



}










export default insights