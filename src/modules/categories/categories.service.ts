import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDto } from "src/dto/category.dto";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async createNewCategory(categoryData: CategoryDto): Promise<Object> {
        const { name } = categoryData
        
        try {
            const category = await this.categoryRepository.findOne({ where: { name } })

            if (category) throw new ConflictException(`This category ${name} already exist on the database`)

            const newCategory = this.categoryRepository.create({name})
            await this.categoryRepository.save(newCategory)

            return {
                message: `Category with name ${name} was created`
            }
        } catch (err) {
            console.error(`Error by creating the new category ${name}`, err)
            throw new InternalServerErrorException(`Error by creating the new category ${name}`)
        }
    }

    async getCategoryById(id: string): Promise<Category> {
        try {
            return await this.categoryRepository.findOneBy({ id })
        } catch (err) {
            console.error(`Error by get category for id ${id}`, err)
            throw new InternalServerErrorException(`Error by get category for id ${id}`)
        }
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find()
        } catch (err) {
            console.error(`Error by getting all categories`, err)
            throw new InternalServerErrorException(`Error by getting all categories`)
        }
    }

    async deleteCategory(id: string): Promise<Object>{
        try {
            const category = await this.categoryRepository.findOneBy({ id })
            if (!category) throw new NotFoundException(`Category with id ${id} could not be found`)

            await this.categoryRepository.delete(category)

            return {
                message: `Category ${category.name} was deleted`
            }
        } catch (err) {
            console.error(`Error by deleting category with id ${id}`, err)
            throw new InternalServerErrorException(`Error by deleting category with id ${id}`)
        }
    }

    async modifyCategory(id: string, newData: CategoryDto): Promise<Object> {
        try {
            const category = await this.categoryRepository.findOneBy({ id })

            if(!category) throw new NotFoundException(`Could found category with id ${id}`)

            await this.categoryRepository.update(category, newData)

            return {
                message: `category ${category.name} was updated to ${newData.name}`
            }
        } catch (err) {
            console.error(`Could modify category with id ${id}`, err)
            throw new InternalServerErrorException(`Could modify category with id ${id}`)
        }
    }
}