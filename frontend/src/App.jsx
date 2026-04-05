import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from "./components/layout/layout.jsx"
import Dashboard from "./pages/dashboard.jsx"
import Transactions from './pages/transactions.jsx'
import Insights from "./pages/insights.jsx"
import { Toaster } from "sonner"
import Budgets from "./pages/budget.jsx"
function App() {


  return (
    <>
      <Toaster richColors position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/budgets" element={<Budgets />} />
          </Route>

        </Routes>



      </BrowserRouter>
    </>
  )
}

export default App
