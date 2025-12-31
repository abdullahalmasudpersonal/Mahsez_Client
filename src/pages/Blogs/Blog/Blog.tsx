import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { TBlog } from "../../../types/blog.types";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const Blog = (blog: TBlog) => {
  const { _id, writer, title, image, description, createdAt } = blog;
  

  const createBlogDate = formatDate(createdAt);

  return (
    <div data-aos="fade-zoom-in" className="d-flex justify-content-center py-2">
      <div className="blog">
        <img src={image} />
        <div className="p-3">
          <h6 className="mt- mb-3" title={title}>
            {title?.length > 40 ? title.slice(0, 40) + "..." : title}
            {/* {title} */}
          </h6>
          <div className="d-flex justify-content-between">
            <h6>
              <FontAwesomeIcon
                icon={faUserAlt}
                style={{ color: "gray", fontSize: "13px" }}
              />
              <small>&nbsp; {writer}</small>
            </h6>
            <h6>
              <small>{createBlogDate}</small>
            </h6>
          </div>
          <hr style={{ border: "0" }} />

          <p>
            {description?.length > 150
              ? description.slice(0, 150) + "..."
              : description}
          </p>
          <h6 className="d-flex align-items-center m-0">
            <FontAwesomeIcon icon={faCaretRight} fontSize="14px" />
            &nbsp; &nbsp;
            <Link
              to={`/blog/${_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <small>Read More</small>
            </Link>
             {/* <small style={{cursor:"pointer"}}>Read More</small> */}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Blog;
