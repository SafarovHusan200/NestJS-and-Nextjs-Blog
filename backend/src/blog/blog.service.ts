import { Injectable } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  blogs: BlogDto[];

  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    this.blogs = [];
  }

  async getAllBlogs() {
    return this.blogModel.find({});
  }

  async create(dto: BlogDto) {
    function slugify(text: string) {
      return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }
    return this.blogModel.create({ ...dto, slug: slugify(dto.title) });
  }

  async getById(id: string) {
    return this.blogModel.findOne({ slug: id });
  }

  async update(id: string, dto: BlogDto) {
    return this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.blogModel.findByIdAndRemove(id);
  }
}
