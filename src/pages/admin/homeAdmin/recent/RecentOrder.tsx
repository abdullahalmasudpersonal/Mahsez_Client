import Loader from "@/pages/shared/loader/Loader";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { TOrder } from "@/types/order.types";
import { TProduct } from "@/types/product.types";
import { formatDate } from "@/utils/formatDate";
import { Table, TableColumnsType } from "antd";

const RecentOrder = () => {
    const { data: orderData, isLoading: orderDataLoading } = useGetAllOrderQuery({});
    const { data: productData } = useGetProductsQuery({});

    const dataTable = orderData?.data
        ?.slice(0, 7)
        ?.map(
            ({
                _id,
                name,
                orderId,
                createdAt,
                contactNumber,
                grandTotal,
                paymentStatus,
                items,
                orderStatus,
                paymentType,
            }: TOrder) => {
                const productsWithImages = items?.map((item) => {
                    const product = productData?.data?.find(
                        (prod: TProduct) => prod._id === item.product_id
                    );
                    return {
                        ...item,
                        image: product?.image?.[0] || null,
                    };
                });

                return {
                    key: _id,
                    name,
                    orderId,
                    createdAt,
                    contactNumber,
                    grandTotal,
                    paymentStatus,
                    items: productsWithImages,
                    orderStatus,
                    paymentType,
                };
            }
        );

    const columns: TableColumnsType<TOrder> = [
        {
            title: "Order ID",
            key: "orderId",
            dataIndex: `orderId`,
            width: 120,
            render: (orderId: string) => `#${orderId}`,
        },
        {
            title: "Image",
            dataIndex: "items",
            key: "items",
            align: "center",
            width: 80,
            render: (items) => {
                const firstItem = items[0];
                return firstItem ? (
                    <>{firstItem.image && (
                        <img src={
                                firstItem.image.includes("res.cloudinary.com")
                                    ? firstItem.image.replace(
                                        "/upload/",
                                        "/upload/f_auto,q_auto/w_50/"
                                    )
                                    : firstItem.image
                            }
                            alt={firstItem.name}
                            style={{ width: 50, height: 50, borderRadius: "5px" }}
                        />
                    )}</>
                ) : (
                    <span>No items available</span>
                );
            },
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "date",
            align: "center",
            width: 120,
            render: (createdAt: string) => formatDate(createdAt),
        },
        {
            title: "Coustomer",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: 150,
        },
        {
            title: "Amount",
            dataIndex: "grandTotal",
            key: "grandTotal",
            align: "center",
            width: 100,
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            align: "center",
            width: 140,
        },
    ];

    return (
        <div>
            {orderDataLoading ? (
                <Loader />
            ) : (
                <div>
                    <Table title={() => (<div style={{ fontSize: "19px", fontWeight: "600", color: "rgb(88, 88, 88)" }}>Recent Orders</div>)}
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

export default RecentOrder;