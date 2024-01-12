import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosProvider } from './context/todosContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodosProvider>
    <App />
    </TodosProvider>
  </React.StrictMode>,
)
