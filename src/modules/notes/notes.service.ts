import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "src/entities/notes.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotesServices{
    constructor(@InjectRepository(Note) private noteRepository: Repository<Note>){}

    getAllNotes(){
        return this.noteRepository.find({})
    }
}