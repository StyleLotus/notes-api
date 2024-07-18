import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Note } from "src/entities/notes.entity";
import { NotesServices } from "./notes.service";
import { NotesController } from "./notes.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Note, Category])],
    providers: [NotesServices],
    controllers: [NotesController]
})
export class NotesModule {}