import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryDto } from "src/dto/category.dto";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    getAllCategories() {
        this.categoriesService.getAllCategories()
    }

    @Get(':id')
    getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
        this.categoriesService.getCategoryById(id)
    }

    @Post()
    createNewCategory(@Body() categoryData: CategoryDto) {
        this.categoriesService.createNewCategory(categoryData)
    }

    @Put(':id')
    modifyCategory(@Param('id', ParseUUIDPipe) id: string, @Body() categoryData: CategoryDto) {
        this.categoriesService.modifyCategory(id, categoryData)
    }

    @Delete()
    deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
        this.categoriesService.deleteCategory(id)
    }
}