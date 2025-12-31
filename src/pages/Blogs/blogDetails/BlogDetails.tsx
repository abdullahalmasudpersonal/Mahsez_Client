import { useParams } from "react-router-dom";
import "./BlogDetails.css";
import { useGetSingleBlogQuery } from "../../../redux/features/blog/BlogApi";

const BlogDetails = () => {
  const { blogId } = useParams();
  const { data: blogData } = useGetSingleBlogQuery(blogId);
  const { title } = blogData?.data || {};
  return (
    <div className="container-xxl mb-4 mt-4 px-1">
      <h5>Blog Details: {title}</h5>
    </div>
  );
};

export default BlogDetails;
