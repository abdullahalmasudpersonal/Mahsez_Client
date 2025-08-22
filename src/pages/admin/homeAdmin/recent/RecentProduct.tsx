import Loader from "@/pages/shared/loader/Loader";
import { useGetProductsWithSearchFilterQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";

const RecentProduct = () => {
    const { data: productData, isLoading: loadingProduct } = useGetProductsWithSearchFilterQuery({  limit: 7 });

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

    const columns: TableColumnsType<TProduct> = [
        {
            title: "Product Name",
            key: "name",
            width: 300,
            render: (item) => (
                <div style={{ display: "flex", alignItems: "center" }}>
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
                        <span>
                            {item.name.length > 30
                                ? `${item.name.slice(0, 30)}...`
                                : item.name}
                        </span>
                    </Link>
                </div>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            align: "center",
            width: 150,
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
    ];

    return (
        <div>
            {loadingProduct ? (
                <Loader />
            ) : (
                <div>
                    <Table title={() => (<div style={{ fontSize: "19px", fontWeight: "600", color: "rgb(88, 88, 88)" }}>New Products</div>)}
                        columns={columns}
                        dataSource={dataTable}
                        pagination={false}
                        sticky
                        scroll={{ x: "max-content" }}
                        style={{ overflowX: "auto" }}
                    />
                </div>
            )}
        </div>
    );
};

export default RecentProduct;