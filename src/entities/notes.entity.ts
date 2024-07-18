import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Note{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar'})
    title: string 

    @Column({type: 'varchar'})
    description: string

    @OneToMany(()=> Category, (category)=> category.note)
    category: Category[]
}