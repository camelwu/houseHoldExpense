export type Category = 
  | '食品'
  | '交通'
  | '住房'
  | '娱乐'
  | '医疗'
  | '教育'
  | '购物'
  | '其他';

export interface Expense {
  id: number;
  amount: number;
  category: Category;
  description: string;
  date: string;
  created_at?: string;
}