import express from 'express';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'expenses.db'));

const app = express();
app.use(express.json());

// 初始化数据库
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// 获取所有支出
app.get('/api/expenses', (req, res) => {
  const expenses = db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
  res.json(expenses);
});

// 添加新支出
app.post('/api/expenses', (req, res) => {
  const { amount, category, description, date } = req.body;
  
  try {
    const stmt = db.prepare(
      'INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(amount, category, description, date);
    
    res.status(201).json({
      id: result.lastInsertRowid,
      amount,
      category,
      description,
      date
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 按月份获取支出
app.get('/api/expenses/:month', (req, res) => {
  const { month } = req.params;
  const expenses = db.prepare(
    'SELECT * FROM expenses WHERE date LIKE ? ORDER BY date DESC'
  ).all(`${month}%`);
  
  res.json(expenses);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});