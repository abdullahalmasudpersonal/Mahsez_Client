import Slider from "react-slick";
import Blog from "../../Blogs/Blog/Blog";
import { useGetBlogsQuery } from "../../../redux/features/blog/BlogApi";
import { TBlog } from "../../../types/blog.types";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const HomeBlogs = () => {
  const { data: blogData } = useGetBlogsQuery({});

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
    autoplay: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: false,
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
      {/*  {blogData?.data?.map((blog: TBlog) => (
        <Blog key={blog._id} {...blog} />
      ))} */}
      <Slider {...settings}>
        {blogData?.data?.map((blog: TBlog) => (
          <Blog key={blog._id} {...blog} />
        ))}
      </Slider>
    </div>
  );
};

export default HomeBlogs;
