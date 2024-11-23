import Slider from "react-slick";
import Blog from "../../Blogs/Blog/Blog";
import { useGetBlogsQuery } from "../../../redux/features/blog/BlogApi";
import { TBlog } from "../../../types/blog.types";
import Loader from "../../shared/loader/Loader";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const HomeBlogs = () => {
  const { data: blogData, isLoading } = useGetBlogsQuery({});

  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h5 className="homefeaturedCategore-title">FROM OUR BLOG</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "380px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <Slider {...settings}>
          {blogData?.data?.map((blog: TBlog, index: number) => (
            <div
              key={blog._id}
              className="delayProductItem"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Blog key={blog._id} {...blog} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeBlogs;
