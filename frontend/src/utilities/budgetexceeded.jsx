function budgetexceeded(transactions, budget) {
    const thismonth = new Date().getMonth()
    return Object.entries(budget).filter(([category, limit]) => {
        const spent = transactions
            .filter(t =>
                t.type === "expense" &&
                t.category === category &&
                new Date(t.rawDate).getMonth() === thismonth
            )
            .reduce((sum, t) => sum + Number(t.amount), 0)
        return spent > limit
    }).length
}

export default budgetexceeded