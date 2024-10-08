import { IsNotEmpty, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string
}