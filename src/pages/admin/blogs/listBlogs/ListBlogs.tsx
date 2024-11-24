import {
  Button,
  Col,
  Popconfirm,
  Row,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../../redux/features/blog/BlogApi";
import { useState } from "react";
import Loader from "../../../shared/loader/Loader";
import { TBlog } from "../../../../types/blog.types";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const { Option } = Select;
const ListBlogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const [deleteBlog] = useDeleteBlogMutation();
  const { data: blogsData, isLoading: blogDataLoading } = useGetBlogsQuery({});
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const handleDeleteBlog = async (blogId: string) => {
    const res = await deleteBlog(blogId).unwrap();
    if (res?.success) {
      toast.success("Delete blog successfully!", {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error("Cannot delete blog!");
      console.log("Cannot delete blog!");
    }
  };

  const navigateToEditBlog = (id: string) => {
    navigate(`/admin/update-blog/${id}`);
  };

  const dataTable = blogsData?.data?.map(
    ({ _id, title, image, writer, description }: TBlog) => ({
      key: _id,
      title,
      image,
      writer,
      description,
    })
  );

  const columns: TableColumnsType<TBlog> = [
    {
      title: "Blog Title",
      key: "title",
      width: 300,
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.image}
            alt="blog image"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/blog/${item.key}`}
          >
            <span>{item.title}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "Writer",
      dataIndex: "writer",
      key: "writer",
      align: "center",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 400,
      render: (text) => (text.length > 100 ? `${text.slice(0, 100)}...` : text),
    },
    {
      title: "Action",
      key: "category",
      align: "center",
      width: 80,
      render: (blog) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/blog/${blog.key}`}
            >
              <Button color="primary" variant="filled">
                <EyeOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => navigateToEditBlog(blog?.key)}
              variant="filled"
              style={{
                backgroundColor: "#FFF8DC",
                border: "none",
              }}
            >
              <EditOutlined style={{ color: "#FFA500" }} />
            </Button>

            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDeleteBlog(blog?.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button color="danger" variant="filled">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard-dev2" style={{ overflowX: "auto" }}>
      <PageTitle pageTitle="Blog List || Admin" />
      <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold side-header">
          All Blog List ({blogsData?.data?.length})
        </h5>
        <Row justify="end">
          <Col>
            <Select
              defaultValue={10}
              style={{ width: 120 }}
              onChange={handlePageSizeChange}
            >
              <Option value={10}>10 / page</Option>
              <Option value={20}>20 / page</Option>
              <Option value={30}>30 / page</Option>
              <Option value={50}>50 / page</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <hr />
      {blogDataLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: "10px" }}>
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{
              position: ["bottomRight"],
              pageSize: pageSize,
              showSizeChanger: false,
            }}
            scroll={{ x: "max-content", y: 500 }}
            style={{ width: "100%" }}
            sticky
          />
        </div>
      )}
    </div>
  );
};

export default ListBlogs;
