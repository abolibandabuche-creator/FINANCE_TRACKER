import removetrailingzeroes from "./removetrailingzeroes.jsx"
function gettotalincome(transactions) {
    const income = transactions.filter(t => t.type === "income")
        .reduce((acc, t) => acc + Number(t.amount), 0).toFixed(2)
    return Number(removetrailingzeroes(income))
}
function gettotalexpense(transactions) {
    const expense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + Number(t.amount), 0).toFixed(2)

    return Number(removetrailingzeroes(expense))
}
function gettotalbalance(transactions) {
    const balance = (gettotalincome(transactions) - gettotalexpense(transactions)).toFixed(2)
    return Number(removetrailingzeroes(balance))
}
function getsavingsrate(transactions) {
    const income = gettotalincome(transactions)
    const expense = gettotalexpense(transactions)
    let savingsrate
    if (income === 0) {
        savingsrate = 0;
        return savingsrate
    }
    savingsrate = ((income - expense) / income * 100).toFixed(2)

    return Number(removetrailingzeroes(savingsrate))
}
export { gettotalbalance, getsavingsrate, gettotalexpense, gettotalincome }
