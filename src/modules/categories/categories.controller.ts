import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryDto } from "src/dto/category.dto";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    getAllCategories() {
        return this.categoriesService.getAllCategories()
    }

    @Get(':id')
    getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriesService.getCategoryById(id)
    }

    @Post()
    createNewCategory(@Body() categoryData: CategoryDto) {
        return this.categoriesService.createNewCategory(categoryData)
    }

    @Put(':id')
    modifyCategory(@Param('id', ParseUUIDPipe) id: string, @Body() categoryData: CategoryDto) {
        return this.categoriesService.modifyCategory(id, categoryData)
    }

    @Delete(':id')
    deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
        console.log(id, "Holaaaa estoy aquiiiiiiii")
        return this.categoriesService.deleteCategory(id)
    }
}