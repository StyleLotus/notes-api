import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Note{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    title: string 

    @Column({type: 'varchar'})
    description: string

    @ManyToOne(()=> Category, (category)=> category.note)
    category: Category
}