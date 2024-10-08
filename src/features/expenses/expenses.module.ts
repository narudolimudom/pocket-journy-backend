import { Expense } from "./expense.entity";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Expense])],
    providers: [ExpensesService],
    controllers: [ExpensesController],
    exports: [ExpensesService]
})

export class ExpensesModule { }