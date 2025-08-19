import Loader from "@/pages/shared/loader/Loader";
import PageTitle from "@/pages/shared/PageTitle/PageTitle";
import { useDeleteProductMutation, useGetProductsWithSearchFilterQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Popconfirm, Row, Select, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import './ProductList';

const { Option } = Select;

const ProductList = () => {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: productData, isLoading: loadingProduct } =
        useGetProductsWithSearchFilterQuery({
            limit: pageSize,
            page: currentPage,
        });
    const [deleteSingleProduct] = useDeleteProductMutation();

    const handleTableChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const navigateToUpdateProduct = (id: string) => {
        navigate(`/admin/update-product/${id}`);
    };

    const dataTable = productData?.data?.map(
        ({
            _id,
            name,
            category,
            price,
            availableQuantity,
            brand,
            image,
            soldQuantity,
        }: TProduct) => ({
            key: _id,
            name,
            category,
            price,
            brand,
            availableQuantity,
            image,
            soldQuantity,
        })
    );

    const deleteProduct = async (productId: string) => {
        const res = await deleteSingleProduct(productId).unwrap();
        if (res?.success) {
            toast.success("Delete prodcuct successfully!", {
                duration: 1000,
                position: "top-right",
            });
        }
    };

    const columns: TableColumnsType<TProduct> = [
        {
            title: "Product Name",
            key: "name",
            // width: 300,
            render: (item) => (
                <div style={{ display: "flex", alignItems: "center", }}>
                    {item?.image?.slice(0, 1).map((img: string, index: number) => (
                        <img key={index}
                            src={
                                img.includes("res.cloudinary.com")
                                    ? img.replace("/upload/", "/upload/f_auto,q_auto/w_50/")
                                    : img
                            }
                            alt={item.name}
                            loading="lazy"
                            style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                                borderRadius: "5px",
                            }}
                        />
                    ))}
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/categore/product/${item.key}`}
                    >
                        <span>{item.name}</span>
                    </Link>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            align: "center",
            width: 100,
        },
        {
            title: "Stock",
            dataIndex: "availableQuantity",
            key: "availableQuantity",
            align: "center",
            width: 100,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            align: "center",
            width: 150,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            align: "center",
            width: 150,
        },
        {
            title: "Sold Quantity",
            dataIndex: "soldQuantity",
            key: "soldQuantity",
            align: "center",
            width: 120,
        },
        {
            title: "Action",
            key: "category",
            align: "center",
            render: (item) => {
                return (
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
                    >
                        <Link to={`/categore/product/${item.key}`}>
                            <Button color="primary" variant="filled">
                                <EyeOutlined />
                            </Button>
                        </Link>
                        <Button
                            onClick={() => navigateToUpdateProduct(item?.key)}
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
                            onConfirm={() => deleteProduct(item?.key)}
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
        <div style={{ flex: 1 }}>
            <PageTitle pageTitle="Products " />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#1c6fc2ff', borderRadius: '5px 5px 0 0' }}>
                <h5 style={{ color: 'white', margin: "0", fontWeight: '700' }}>  All Product List ({productData?.meta?.total})</h5>
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
            {loadingProduct ? (
                <Loader />
            ) : (
                <div style={{  paddingTop: '20px',}}>
                    <ConfigProvider theme={{ components: { Table: { headerBorderRadius: 0, } } }}>
                        <Table
                            columns={columns}
                            dataSource={dataTable}
                            pagination={{
                                pageSize: pageSize,
                                current: currentPage,
                                onChange: handleTableChange,
                                total: productData?.meta?.total,
                                showSizeChanger: false,
                            }}
                            scroll={{ x: "max-content", y: 570, }}
                            style={{ width: "100%",  }}
                            sticky
                        />
                    </ConfigProvider>
                </div>
            )
            }
        </div>
    );
};

export default ProductList;
