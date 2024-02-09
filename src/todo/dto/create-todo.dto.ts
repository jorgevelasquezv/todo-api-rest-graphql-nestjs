import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    readonly description: string;
}
