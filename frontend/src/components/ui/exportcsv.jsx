import useTransactionStore from "../../zustandstore/transactionstore"
function exportcsv(transactions) {
    const headers = ["Description", "Amount", "Category", "Type", "Date"]
    const rows = transactions.map(t => [
        t.description,
        t.amount,
        t.category,
        t.type,
        t.date
    ])
    const csv = [headers, ...rows].map(t => t.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    URL.revokeObjectURL(url)
}
export default exportcsv