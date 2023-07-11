import { GetServerSideProps, NextPage } from "next";
import { BlogType } from "@/interfaces/blog.interface";
import { BlogService } from "@/services/blog.service";
import { useRouter } from "next/router";
import Layout from "./layout";

const DetailedBlog: NextPage<DetatailedBlogPageProps> = ({ blog }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Layout>
      <div className="container mt-3">
        <button className="btn btn-outline-primary" onClick={handleClick}>
          Back
        </button>
        <h1 className="mt-5">{blog.title}</h1>
        <h5 className="mt-3">{blog.excerpt}</h5>
        <p className="mt-3">{blog.description}</p>
      </div>
    </Layout>
  );
};

export default DetailedBlog;

export const getServerSideProps: GetServerSideProps<
  DetatailedBlogPageProps
> = async ({ query }) => {
  const blog = await BlogService.getBlogBySlug(query.slug as string);

  return { props: { blog } };
};

interface DetatailedBlogPageProps {
  blog: BlogType;
}
