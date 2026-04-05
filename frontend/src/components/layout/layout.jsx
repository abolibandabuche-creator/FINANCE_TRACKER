import Sidebar from "./sidebar.jsx"
import { Outlet } from "react-router-dom"



function layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default layout