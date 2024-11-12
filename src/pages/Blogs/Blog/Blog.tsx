import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { TBlog } from "../../../types/blog.types";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const Blog = (blog: TBlog) => {
  const { _id, writer, title, image, createdAt } = blog;

  const createBlogDate = formatDate(createdAt);

  return (
    <div className="d-flex justify-content-center py-1 mt-3">
      <div className="blog">
        <img src={image} className="blogImage" />
        <div className="p-3">
          <h6 className="mt- mb-3">{title}</h6>
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
          <h6 className="d-flex align-items-center m-0">
            <FontAwesomeIcon icon={faCaretRight} fontSize="14px" />
            &nbsp; &nbsp;
            <Link
              to={`/blog/${_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <small>Read More</small>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Blog;

//
{
  /* <div className="d-flex justify-content-center py-1 mt-3">
<div className="blog">
  <img className="img-fluid" src={image} />
  <div className="p-3">
    <h6 className="mt- mb-3">{title}</h6>
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
    <hr />
    <h6 className="d-flex align-items-center m-0">
      <FontAwesomeIcon icon={faCaretRight} fontSize="14px" />
      &nbsp; &nbsp;
      <small>Read More</small>
    </h6>
  </div>
</div>
</div> */
}

{
  /* <div data-aos="fade-up-right" className="col">
<div className="bolg-dev-dev h-100">
  <img src={image} className="card-img-top rounded-top w-100" alt="..." />
  <div>
    <span className="position-absolute start-50 translate-middle badge rounded-pill bg-dark text-light py-2 px-3">
      {createBlogDate}
    </span>
  </div>
  <div className="p-3 text-justify">
    <h5 className="pt-3 pb-2 text-center">{title}</h5>
    <p className="">{description}</p>
  </div>
  <div className="bolg-read-more">
    <button>
      <span>Read More </span>
      <span>
        <FontAwesomeIcon
          style={{ height: "12px" }}
          icon={faChevronRight}
        />
        <FontAwesomeIcon
          style={{ height: "12px" }}
          icon={faChevronRight}
        />
      </span>
    </button>
  </div>
</div>
</div> */
}
