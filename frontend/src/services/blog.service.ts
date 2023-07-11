import { FormValue } from "@/components/form/form.props";
import { BlogType } from "@/interfaces/blog.interface";
import axios from "axios";

export const baseDomain = "http://localhost:5000/api/v1";

export const BlogService = {
  async getAllBlog() {
    const { data } = await axios.get<BlogType[]>(`${baseDomain}/post`);
    return data;
  },

  async getBlogBySlug(slug: string) {
    const { data } = await axios.get<BlogType>(`${baseDomain}/post/${slug}`);
    return data;
  },

  async deleteBlog(id: string) {
    const { data } = await axios.delete(`${baseDomain}/post/${id}`, {
      data: id,
    });
    return data;
  },

  async createBlog(dataForm: FormValue) {
    const { data } = await axios.post(`${baseDomain}/post`, dataForm);
    return data;
  },

  async updateBlog(formData: FormValue, id: string) {
    const { data } = await axios.patch(`${baseDomain}/post/${id}`, formData);

    return data;
  },
};
