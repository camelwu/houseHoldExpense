import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import type { Expense, Category } from './types/expense';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = async (
    amount: number,
    category: Category,
    description: string,
    date: string
  ) => {
    const newExpense: Expense = {
      id: Date.now(),
      amount,
      category,
      description,
      date,
      created_at: new Date().toISOString()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header totalExpenses={totalExpenses} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      </div>
    </div>
  );
}

export default App;