import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { ExpensesService } from "./expenses.service";

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createExpense(
        @Request() req,
        @Body() createExpenseDto: CreateExpenseDto
    ) {
        const userId = req.user.id;
        return this.expensesService.createExpense(userId, createExpenseDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getExpenses(@Request() req) {
        const userId = req.user.id;
        return this.expensesService.getExpenses(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteExpense(
        @Request() req,
        @Param('id') id: string
    ) {
        const userId = req.user.id;
        return this.expensesService.deleteExpenseById(userId, id)
    }

}