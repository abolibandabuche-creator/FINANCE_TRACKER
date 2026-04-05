import { create } from "zustand"

const usebudgetstore = create((set) => ({
    budget: JSON.parse(localStorage.getItem("budget") || "{}"),
    setbudget: (name, value) => set((state) => {
        const updated = { ...state.budget, [name]: value }
        localStorage.setItem("budget", JSON.stringify(updated))
        return { budget: updated }
    }),
    deletebudget: (name) => set((state) => {
        const updated = { ...state.budget }
        delete updated[name]
        localStorage.setItem("budget", JSON.stringify(updated))
        return { budget: updated }
    })


}))
export default usebudgetstore