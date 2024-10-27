import React from 'react';
import { PieChart, Calendar, Tag } from 'lucide-react';
import { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  loading?: boolean;
}

export function ExpenseList({ expenses, selectedMonth, onMonthChange, loading }: ExpenseListProps) {
  const months = Array.from(
    new Set(expenses.map((expense) => expense.date.substring(0, 7)))
  ).sort((a, b) => b.localeCompare(a));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          支出记录
        </h2>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">全部月份</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month.replace('-', '年')}月
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500 py-8">暂无支出记录</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <div className="flex items-start gap-4">
                <Tag className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">{expense.description || expense.category}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {expense.date}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold">
                ¥{expense.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}