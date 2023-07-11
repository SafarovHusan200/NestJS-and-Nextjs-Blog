import React, { useState } from "react";
import Layout from "./layout";
import Form from "@/components/form/form";
import { BlogService } from "@/services/blog.service";
import { FormValue } from "@/components/form/form.props";

const CreateBlog = () => {
  const [error, SetError] = useState();
  const onSubmit = async (formData: FormValue) => {
    const data = await BlogService.createBlog(formData);
    return data;
  };
  return (
    <Layout>
      <Form onSubmit={onSubmit} sectionTitle={"Create Blog"} />
    </Layout>
  );
};

export default CreateBlog;
