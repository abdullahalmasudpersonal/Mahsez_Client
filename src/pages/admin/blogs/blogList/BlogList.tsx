import Loader from "@/pages/shared/loader/Loader";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/redux/features/blog/BlogApi";
import { TBlog } from "@/types/blog.types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Popconfirm, Row, Select, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const { Option } = Select;

const BlogList = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [deleteBlog] = useDeleteBlogMutation();
    const { data: blogsData, isLoading: blogDataLoading } = useGetBlogsQuery({});

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

    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
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
        <div>
            <PageTitle pageTitle="Blog List || Admin" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>
                    All Blog List ({blogsData?.data?.length})
                </h5>
                <Row>
                    <Col>
                        <Select
                            defaultValue={10}
                            style={{ width: 120 }}
                            onChange={(value) => setPageSize(value)}
                        >
                            <Option value={10}>10 / page</Option>
                            <Option value={20}>20 / page</Option>
                            <Option value={30}>30 / page</Option>
                            <Option value={50}>50 / page</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            {blogDataLoading ? (
                <Loader />
            ) : (
                <div style={{ paddingTop: '20px', }}>
                    <ConfigProvider theme={{ components: { Table: { headerBorderRadius: 0, } } }}>
                        <Table
                            columns={columns}
                            dataSource={dataTable}
                            pagination={{
                                pageSize: pageSize,
                                current: currentPage,
                                total: blogsData?.meta?.total,
                                onChange: handleTableChange,
                                showSizeChanger: false,
                            }}
                            scroll={{ x: "max-content", y: 570 }}
                            style={{ width: "100%" }}
                            sticky
                        />
                    </ConfigProvider>
                </div>
            )}
        </div>
    );
};

export default BlogList;