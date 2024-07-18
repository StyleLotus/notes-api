import { Controller, Get } from "@nestjs/common";
import { NotesServices } from "./notes.service";

@Controller('notes')
export class NotesController{
    constructor(private readonly noteService: NotesServices){}

    @Get()
    getAllNotes(){
        return this.noteService.getAllNotes()
    }
}