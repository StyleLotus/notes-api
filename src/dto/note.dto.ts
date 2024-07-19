import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NoteDto{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    category: string
}