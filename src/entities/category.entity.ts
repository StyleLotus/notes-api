import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./notes.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    name: string

    @OneToMany(()=> Note, (note)=> note.category)
    note: Note[]
}
