import { BlogType } from "@/interfaces/blog.interface";
import { BlogService } from "@/services/blog.service";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "../layout";
import Form from "@/components/form/form";
import { FormValue } from "@/components/form/form.props";

const EditBlog: NextPage<EditBlogPageProps> = ({ blog }) => {
  const onSubmit = async (formData: FormValue) => {
    const data = await BlogService.updateBlog(formData, blog._id);
    return data;
  };
  return (
    <Layout>
      <Form
        onSubmit={onSubmit}
        sectionTitle={`Edit ${blog.slug}`}
        values={blog}
      />
    </Layout>
  );
};

export default EditBlog;

export const getServerSideProps: GetServerSideProps<
  EditBlogPageProps
> = async ({ query }) => {
  const blog = await BlogService.getBlogBySlug(query.slug as string);

  return { props: { blog } };
};

interface EditBlogPageProps {
  blog: BlogType;
}
