import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { NotesServices } from "./notes.service";
import { NoteDto } from "src/dto/note.dto";

@Controller('notes')
export class NotesController{
    constructor(private readonly noteService: NotesServices){}

    @Get()
    getAllNotes(){
        return this.noteService.getAllNotes()
    }

    @Get(':id')
    getNoteById(@Param('id', ParseUUIDPipe) id: string){
        return this.noteService.getNoteById(id)
    }

    @Post()
    createNewNote(@Body() noteData: NoteDto){
        return this.noteService.createNote(noteData)
    }

    @Put(':id')
    modifyNote(@Param('id', ParseUUIDPipe) id: string, @Body() newData: Partial<NoteDto>){
        return this.noteService.modifyNote(id, newData)
    }

    @Delete(':id')
    deleteNote(@Param('id', ParseUUIDPipe) id: string){
        return this.noteService.deleteNote(id)
    }
}