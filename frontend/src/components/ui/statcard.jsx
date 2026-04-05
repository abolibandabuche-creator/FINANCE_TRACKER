import formatter from "../../utilities/formatter"
function Statcard({ heading, amount = "", text = "", suffix = "", className, icon, variant = "stat" }) {
    const headingClass = variant === "insight" ? "insight-heading" : "stat-heading"
    const amountClass = variant === "insight" ? "insight-amount" : "stat-amount"
    const textClass = variant === "insight" ? "insight-text" : ""

    function formatamount() {
        if (amount === "") return ""
        if (suffix === "%") return `${amount}%`
        if (suffix === ":") return `${amount}`
        return `₹${formatter(amount)}`
    }

    return (
        <div className={className || "stat-card"}>
            {icon && <span className="insight-icon">{icon}</span>}
            <span className={headingClass}>{heading}</span>
            {text && <span className={textClass}>{text}</span>}
            <span className={amountClass}>{formatamount()}</span>
        </div>
    )
}

export default Statcard