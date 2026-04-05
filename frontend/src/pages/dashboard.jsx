import useTransactionStore from "../zustandstore/transactionstore"
import AddTransactions from "../components/ui/addtransactions.jsx"
import { toast } from "sonner"
import Dashboardtoprow from "../components/dashboard/dashboardtoprow.jsx"
import Dashboardmiddlerow from "../components/dashboard/dashboardmiddlerow.jsx"
import Dashboardbottomrow from "../components/dashboard/dashboardbottomrow.jsx"
import exportcsv from "../components/ui/exportcsv.jsx"
function dashboard() {
    const modalON = useTransactionStore((state) => state.modalON)
    const setmodal = useTransactionStore((state) => state.setmodal)
    const admin = useTransactionStore((state) => state.admin)
    const setadmin = useTransactionStore((state) => state.setadmin)
    const updated = useTransactionStore((state) => state.updated)
    const transactions = useTransactionStore((state) => state.transactions)
    function modalfunc() {
        setmodal(true)
    }
    return (
        <div className="dashboard-page">
            <h1>DASHBOARD</h1>
            {admin && <button className="add-transaction-btn" onClick={modalfunc}>+ Add Transaction</button>}
            <button className="export-btn" onClick={() => exportcsv(transactions)}>Export CSV</button>
            {admin && modalON && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <AddTransactions />
                    </div>
                </div>
            )}
            <Dashboardtoprow />
            <Dashboardmiddlerow />
            <Dashboardbottomrow />
        </div>
    )




}






export default dashboard