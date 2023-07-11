import { BlogCard, Navbar } from "@/components";
import { BlogType } from "@/interfaces/blog.interface";
import { BlogService } from "@/services/blog.service";
import { GetServerSideProps, NextPage } from "next";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "./layout";

const Home: NextPage<HomePageProps> = ({ blogs }) => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {blogs?.length > 0
            ? blogs?.map((item) => <BlogCard item={item} key={item._id} />)
            : ""}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const blogs = await BlogService.getAllBlog();
  return {
    props: {
      blogs,
    },
  };
};

interface HomePageProps {
  blogs: BlogType[];
}
