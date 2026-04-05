import { NavLink } from "react-router-dom"
import useTransactionStore from "../../zustandstore/transactionstore.jsx"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

function Sidebar() {
    const admin = useTransactionStore((state) => state.admin)
    const setadmin = useTransactionStore((state) => state.setadmin)
    const [dark, setDark] = useState(() => localStorage.getItem("darkmode") === "true")

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
    }, [])

    function toggleDark() {
        const newvalue = !dark
        setDark(newvalue)
        localStorage.setItem("darkmode", String(newvalue))
        document.documentElement.classList.toggle("dark", newvalue)
    }

    function togglefunc() {
        setadmin(!admin)
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">Finance</div>
            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Dashboard
                </NavLink>
                <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Transactions
                </NavLink>
                <NavLink to="/insights" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Insights
                </NavLink>
                <NavLink to="/budgets" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Budgets
                </NavLink>
            </nav>
            <button className="dark-toggle" onClick={toggleDark}>
                <div className={`dark-toggle-knob ${dark ? "is-dark" : ""}`}>
                    {dark ? <Sun size={12} /> : <Moon size={12} />}
                </div>
            </button>
            <div className="role-toggle" onClick={togglefunc}>
                <div className={`toggle-pill ${admin ? "is-admin" : ""}`}></div>
                <span className={`toggle-label ${!admin ? "active-label" : ""}`}>User</span>
                <span className={`toggle-label ${admin ? "active-label admin-active" : ""}`}>Admin</span>
            </div>
        </aside>
    )
}

export default Sidebar