function dashboardbudgetbars(transactions, budget) {
    const thismonth = new Date().getMonth()
    return Object.entries(budget)
        .map(([category, limit]) => {
            const spent = transactions
                .filter(t =>
                    t.type === "expense" &&
                    t.category === category &&
                    new Date(t.rawDate).getMonth() === thismonth
                )
                .reduce((sum, t) => sum + Number(t.amount), 0)
            return { category, limit, spent }
        })
        .filter(item => item.spent > 0).slice(0, 2)
}

export default dashboardbudgetbars