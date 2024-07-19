import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteDto } from "src/dto/note.dto";
import { Category } from "src/entities/category.entity";
import { Note } from "src/entities/notes.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotesServices {
    constructor(
        @InjectRepository(Note) private noteRepository: Repository<Note>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async getAllNotes() {
        try {
            return await this.noteRepository.find()
        } catch (err) {
            console.error(`Could get all the notes`, err)
        }
    }

    async getNoteById(id: string) {
        try {
            const note = await this.noteRepository.findOneBy({ id })

            if (!note) throw new NotFoundException(`Could not find note by id ${id}`)

            return note
        } catch (err) {
            console.error(`Error getting the note for id ${id}`, err)
            throw new InternalServerErrorException(`Error getting the note for id ${id}`)
        }
    }

    async createNote(noteData: NoteDto) {
        const { title, description, category: categoryName } = noteData
        try {
            let existingCategory: Category

            if (categoryName) {
                existingCategory = await this.categoryRepository.findOne({ where: { name: categoryName } })
                if (!existingCategory) {
                    throw new NotFoundException(`Could find category ${categoryName}`)
                }
            }

            const newNote = this.noteRepository.create({
                title: title,
                description: description,
                category: existingCategory
            })

            await this.noteRepository.save(newNote)
        } catch (err) {
            console.error(`Could not create note with title ${title}`, err)
            throw new InternalServerErrorException(`Could not create note with title ${title}`)
        }
    }

    async modifyNote(id: string, newData: Partial<NoteDto>) {
        const { title, description, category: categoryName } = newData

        try {
            const note = await this.noteRepository.findOneBy({ id })
            let existingCategory: Category = null

            if (!note) throw new NotFoundException(`Could find note by id ${id}`)

            if (categoryName) {
                existingCategory = await this.categoryRepository.findOneBy({ name: categoryName })
                if (!existingCategory) {
                    throw new NotFoundException(`Could find category ${categoryName}`)
                }
            }

            await this.noteRepository.update(id, {
                title: title ?? note.title,
                description: description ?? note.description,
                category: existingCategory ?? note.category
            })

            return {
                message: `Note with title ${title ?? note.title} was updated`
            }
        } catch (err) {
            console.error(`Could not find note with id ${id} `, err)
            throw new InternalServerErrorException(`Could not find note with id ${id} `)
        }
    }

    async deleteNote(id: string) {
        try {
            const note = await this.noteRepository.findOneBy({ id })
            if(!note) throw new NotFoundException(`Could not find note with id ${id}`)

            await this.noteRepository.delete(note)

            return { 
                message: `Note with id ${id} was deleted`
            }
        } catch (err) {
            console.error(`Could delete note with id ${id} `, err)
            throw new InternalServerErrorException(`Could delete note with id ${id} `)
        }
    }
}