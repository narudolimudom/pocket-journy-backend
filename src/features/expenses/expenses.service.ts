import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { Expense } from "./expense.entity";

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private readonly expensesRepository: Repository<Expense>
    ) { }

    async createExpense(userId: string, createDto: CreateExpenseDto): Promise<Expense> {
        const existExpenseName = await this.expensesRepository.find({
            where: {
                name: createDto.name,
                createdBy: userId
            }
        })

        if (existExpenseName.length) {
            throw new NotAcceptableException
        }

        const expense = this.expensesRepository.create({
            ...createDto,
            createdBy: userId
        })
        const savedExpense = await this.expensesRepository.save(expense)
        return savedExpense;
    }

    async getExpenses(userId: string) {
        const expenses = await this.expensesRepository.find({
            where: { createdBy: userId }
        })
        return expenses
    }

    async getExpenseById(userId: string, expenseId: string): Promise<Expense> {
        try {
            const expense = await this.expensesRepository.findOne({
                where: {
                    createdBy: userId,
                    id: expenseId
                }
            })
            return expense;
        } catch (error) {
            throw new NotFoundException
        }
    }

    async deleteExpenseById(userId: string, expenseId: string) {

        if (!expenseId) {
            throw new BadRequestException('Expense ID is required');
        }

        const expense = await this.getExpenseById(userId, expenseId);

        if (!expense) {
            throw new NotFoundException;
        };

        const removedExpense = await this.expensesRepository.remove(expense)
        return removedExpense;
    }
}