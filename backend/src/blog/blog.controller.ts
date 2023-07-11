import {
  Controller,
  HttpCode,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogDto } from './dto/blog.dto/blog.dto';
import { BlogService } from './blog.service';

@Controller('post')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: BlogDto) {
    return this.blogService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.blogService.getById(id);
  }

  @HttpCode(201)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: BlogDto) {
    return this.blogService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
