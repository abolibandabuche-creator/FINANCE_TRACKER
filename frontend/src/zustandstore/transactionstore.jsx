import { create } from "zustand"
import transactions from "../pages/transactions"

const useTransactionStore = create((set) => ({
    transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),//for scalability will change this to object of objects for now for less users this is array of objects
    addtransactions: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
    modalON: false,
    setmodal: (value) => set((state) => ({ modalON: value })),
    admin: false,
    setadmin: (value) => set((state) => ({ admin: value })),
    updated: false,
    setupdated: (value) => set((state) => ({ updated: value })),
    deletetransactions: (value) => set((state) => ({ transactions: state.transactions.filter(t => t.rawDate !== value) })),
    edittransaction: (rawDate, updatedfields) => set((state) => ({
        transactions: state.transactions.map(t =>
            t.rawDate === rawDate ? { ...t, ...updatedfields } : t
        )
    }))
}))
export default useTransactionStore