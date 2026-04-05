import Recenttransactions from "../ui/recenttransactions.jsx";
import useTransactionStore from "../../zustandstore/transactionstore";
import Dashboardbudgetsection from "../ui/dashboardbudgetsection.jsx"
function dashboardbottomrow() {
    const transactions = useTransactionStore((state) => state.transactions)
    return (<>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Recenttransactions />
            <Dashboardbudgetsection />
        </div>
    </>)




}
export default dashboardbottomrow