function transactionssearch(transactions, query) {
    return transactions.filter(t => (
        t.description.toLowerCase().includes(query.toLowerCase())
        || t.category.toLowerCase().includes(query.toLowerCase())
        || t.date.toLowerCase().includes(query.toLowerCase())
        || t.type.toLowerCase().includes(query.toLowerCase())
        || t.amount.toLowerCase().includes(query.toLowerCase())
    ));

}
export default transactionssearch