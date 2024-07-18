import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./notes.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    name: string

    @ManyToOne(()=> Note, (note)=> note.category)
    note: Note
}
