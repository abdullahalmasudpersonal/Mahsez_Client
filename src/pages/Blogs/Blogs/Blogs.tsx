import "./Blogs.css";
import Blog from "../Blog/Blog";
import { useGetBlogsQuery } from "../../../redux/features/blog/BlogApi";
import { TBlog } from "../../../types/blog.types";
import Loader from "../../shared/loader/Loader";

const Blogs = () => {
  const { data: blogData, isLoading } = useGetBlogsQuery({});

  return (
    <div className="container-xxl mb-5 mt-4">
      <h2 className="mb-4 text-center">Blogs</h2>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "380px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="blogs-dev">
          {blogData?.data?.map((blog: TBlog, index: number) => (
            <div
              key={blog._id}
              className="delayProductItem"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Blog key={blog._id} {...blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
