import { DataSource } from "typeorm";
import { Expense } from "./features/expenses/expense.entity";
import { ExpenseRefactor1728316300001 } from "./migrations/ExpenseRefactor1728316300001";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Expense],
    migrations: [ExpenseRefactor1728316300001],
  });