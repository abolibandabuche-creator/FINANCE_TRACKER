import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts"
import removetrailingzeroes from "../../utilities/removetrailingzeroes.jsx"
import useTransactionStore from "../../zustandstore/transactionstore.jsx"
function dashboardMiddleRow() {
    const transactions = useTransactionStore((state) => state.transactions)
    const categoryMap = {}
    transactions
        .filter(t => t.type === "expense")
        .forEach(t => {
            const amt = Number(t.amount).toFixed(2)
            categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(amt)
        })
    const donutData = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value: Number(removetrailingzeroes(value.toFixed(2)))
    }))

    const monthMap = {}
    transactions.forEach(t => {
        const month = new Date(t.rawDate).toLocaleString("en-IN", { month: "short" })
        if (!monthMap[month]) monthMap[month] = { month, income: 0, expense: 0 }
        const amt = Number(t.amount).toFixed(2)
        if (t.type === "income") monthMap[month].income += Number(amt)
        else monthMap[month].expense += Number(amt)
    })
    const barData = Object.values(monthMap).map(m => ({
        month: m.month,
        income: Number(removetrailingzeroes(m.income.toFixed(2))),
        expense: Number(removetrailingzeroes(m.expense.toFixed(2)))
    }))

    const COLORS = ["#3B6D11", "#A32D2D", "#1D9E75", "#BA7517", "#185FA5", "#993556", "#534AB7", "#0F6E56"]

    return (
        <div className="charts-row">
            <div className="chart-card">
                <p className="chart-title">Monthly Overview</p>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData} barGap={4}>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`} />
                        <Bar dataKey="income" fill="#3B6D11" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expense" fill="#A32D2D" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-card">
                <p className="chart-title">Spending Breakdown</p>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={donutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`} />
                        <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default dashboardMiddleRow