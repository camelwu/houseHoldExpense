const API_URL = 'http://localhost:3000/api';

export async function fetchExpenses() {
  const response = await fetch(`${API_URL}/expenses`);
  if (!response.ok) throw new Error('Failed to fetch expenses');
  return response.json();
}

export async function createExpense(expense: {
  amount: number;
  category: string;
  description: string;
  date: string;
}) {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
  
  if (!response.ok) throw new Error('Failed to create expense');
  return response.json();
}

export async function fetchExpensesByMonth(month: string) {
  const response = await fetch(`${API_URL}/expenses/${month}`);
  if (!response.ok) throw new Error('Failed to fetch expenses');
  return response.json();
}