# Finance Tracker

🔗 **Live Demo:** https://finance-tracker-smoky-psi.vercel.app


A personal finance management app built with React. Track income and expenses, set budgets, view spending insights, and export your data.

##  Features
- Add, edit, and delete transactions **(Admin only)**
- Dashboard with stat cards, charts, and recent transactions
- Budget tracking with progress bars and exceeded alerts
- Insights page with spending analysis
- Search, filter, and sort transactions
- CSV export
- **Role-based access control** — Admin can make changes, 
  User can only view
- Dark mode with persistence
- localStorage persistence

## Tech Stack

- React + Vite
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)
- Sonner (toast notifications)
- React Router

## Getting Started
```bash
npm install
npm run dev
```

## Pages

- **Dashboard** — overview of balance, income, expenses, budget health
- **Transactions** — full transaction list with search, filter, sort, edit, delete
- **Insights** — spending breakdown and monthly comparisons  
- **Budgets** — set and manage monthly budgets per category
