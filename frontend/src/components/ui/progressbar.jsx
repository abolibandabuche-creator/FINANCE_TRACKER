function ProgressBar({ spent, limit }) {
    const percentage = Math.min((spent / limit) * 100, 100)

    function getcolor() {
        if (percentage >= 100) return "#F09595"
        if (percentage >= 80) return "#EF9F27"
        return "#97C459"
    }

    return (
        <div className="progress-wrap">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%`, background: getcolor() }}
                />
            </div>
            <div className="progress-labels">
                <span className="progress-spent">₹{spent} spent</span>
                <span className="progress-percent">{percentage.toFixed(0)}%</span>
            </div>
        </div>
    )
}

export default ProgressBar