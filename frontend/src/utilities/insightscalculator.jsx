import removetrailingzeroes from "../utilities/removetrailingzeroes.jsx"
function highestspendingcategory(transactions) {
    if (transactions.length < 1) return ""

    const highestobj = transactions.reduce((max, t) =>
        Number(t.amount) > Number(max.amount) ? t : max
        , transactions[0])
    const category = highestobj.category
    const amount = highestobj.amount
    return { category, amount };

}
function monthlycomparison(transactions) {
    if (transactions.length < 1) return ""
    const thismonth = new Date().getMonth()
    const lastmonth = thismonth == 0 ? 11 : thismonth - 1
    const thismonthamount = transactions.filter((t) => t.type === "expense" && new Date(t.rawDate).getMonth() === thismonth).reduce((sum, t) =>
        sum + Number(t.amount)
        , 0)
    const lastmonthamount = transactions.filter((t) => t.type === "expense" && new Date(t.rawDate).getMonth() === lastmonth).reduce((sum, t) =>
        sum + Number(t.amount)
        , 0)
    if (thismonthamount === 0) {
        return "No data from this month"
    }
    if (lastmonthamount === 0) {
        return "No data from last month to compare with"
    }
    const percentage = (((thismonthamount - lastmonthamount) / lastmonthamount) * 100).toFixed(1)
    if (percentage > 0) {
        const text = `You have spent ${percentage} more compared to last month`
        return text;
    }
    else if (percentage < 0) {
        const text = `You have spent ${percentage} lesser compared to last month`
        return text;
    }
    else if (percentage == 0) {
        const text = `Your expenditure is same as last month up till now`
        return text;
    }

}
function mostfrequentcategory(transactions) {
    if (transactions.length < 1) { return "" }
    const categoryobj = transactions.filter((t) => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + 1
            return acc
        }
            , {})
    const mostFrequent = Object.entries(categoryobj)
        .reduce((max, [category, count]) =>
            count > max.count ? { category, count } : max
            , { category: "", count: 0 })
    const amount = transactions.filter((t) => t.type === "expense" && t.category === mostFrequent.category).reduce((sum, t) => sum + Number(t.amount), 0)
    return { text: `You spend most often on ${mostFrequent.category} (${mostFrequent.count} times)`, amount }
}
function averagespend(transactions) {
    if (transactions.length < 1)
        return ""
    const size = transactions.filter(t => t.type === "expense").length
    const amount = transactions.filter(t => t.type === "expense").reduce((sum, t) =>
        sum + Number(t.amount)
        , 0)
    const average = (amount / size).toFixed(2);
    return removetrailingzeroes(Number(average))

}
export { highestspendingcategory, monthlycomparison, mostfrequentcategory, averagespend }