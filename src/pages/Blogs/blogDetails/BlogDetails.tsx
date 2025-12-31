import { useParams } from "react-router-dom";
import "./BlogDetails.css";
import { useGetSingleBlogQuery } from "../../../redux/features/blog/BlogApi";
import { Grid, Typography } from "antd";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const BlogDetails = () => {
  const screens = useBreakpoint();
  const { blogId } = useParams();
  const { data: blogData } = useGetSingleBlogQuery(blogId);
  const { title, description } = blogData?.data || {};

  const level =
    screens.xl ? 2 :
      screens.lg ? 2 :
        screens.md ? 4 :
          screens.sm ? 4 : 5;

  return (
    <div className="container-xxl mb-4 mt-4 px-1">
      <Title level={level} style={{ textAlign: "center", fontWeight: '700' }}>Blog Details</Title>
      <Title level={level} style={{ textAlign: "center", margin: '0' }}>{title}</Title>
      <Typography style={{paddingTop:'10px', fontSize:'16px', lineHeight:'1.4', textAlign:'justify'}}>
        {description}
      </Typography>
    </div>
  );
};

export default BlogDetails;
