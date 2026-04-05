function transactionsfilter(transactions, { newest, oldest, highest, lowest }) {
    function datesort() {
        return [...transactions].sort((a, b) => {
            if (newest) {
                return new Date(b.date) - new Date(a.date)
            }
            if (oldest) {
                return new Date(a.date) - new Date(b.date)
            }
            return 0;
        })
    }
    function amountsort() {
        const updated = datesort()
        return [...updated].sort((a, b) => {
            if (highest) {
                return Number(b.amount) - Number(a.amount)
            }
            if (lowest) {
                return Number(a.amount) - Number(b.amount)
            }
            return 0;
        })

    }
    return amountsort();
}
export default transactionsfilter