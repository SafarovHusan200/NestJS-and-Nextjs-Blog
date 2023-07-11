import React from "react";
import { BlogCardProps } from "./blog-card-props";
import { calculateTimeToRead } from "@/utils/time";
import { useRouter } from "next/router";
import { BlogService } from "@/services/blog.service";

export default function BlogCard({ item }: BlogCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${item.slug}`);
  };

  const onDeletehandle = async () => {
    try {
      const statusResponse = await BlogService.deleteBlog(item._id);
      if (statusResponse) {
        router.replace(router.asPath);
      }
    } catch (error) {
      const result = error as Error;
      console.log(result.message);
    }
  };
  return (
    <div className="col" key={item._id}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.excerpt}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => router.push(`/edit/${item.slug}`)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={onDeletehandle}
              >
                Delete
              </button>
            </div>
            <small className="text-body-secondary">
              {calculateTimeToRead(item.description)} min
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
