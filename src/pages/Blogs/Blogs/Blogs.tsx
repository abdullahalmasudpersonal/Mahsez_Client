import "./Blogs.css";
import Blog from "../Blog/Blog";
import { useGetBlogsQuery } from "../../../redux/features/blog/BlogApi";
import { TBlog } from "../../../types/blog.types";

const Blogs = () => {
  const { data: blogData } = useGetBlogsQuery({});
  return (
    <div className="container-xxl mb-5 mt-4">
      <h2 className="mb-4 text-center">Blogs</h2>
      <div className="blogs-dev">
        {blogData?.data?.map((blog: TBlog) => (
          <Blog key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
