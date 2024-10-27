import React from 'react';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  totalExpenses: number;
}

export function Header({ totalExpenses }: HeaderProps) {
  return (
    <header className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-600" />
          家庭支出记录
        </h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">总支出</p>
          <p className="text-2xl font-bold text-blue-600">
            ¥{totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>
    </header>
  );
}