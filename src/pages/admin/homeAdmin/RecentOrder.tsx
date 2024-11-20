import { Table, TableColumnsType } from "antd";
import { useGetAllOrderQuery } from "../../../redux/features/order/orderApi";
import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";
import { TOrder } from "../../../types/order.types";
import Loader from "../../shared/loader/Loader";
import { formatDate } from "../../../utils/formatDate";
import { TProduct } from "../../../types/product.types";

const RecentOrder = () => {
  const { data: orderData, isLoading: orderDataLoading } = useGetAllOrderQuery(
    {}
  );
  const { data: productData } = useGetProdcutsQuery({});

  const dataTable = orderData?.data?.map(
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
      const productsWithImages = items.map((item) => {
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
          <>
            {firstItem.image && (
              <img
                src={firstItem.image}
                alt={firstItem.name}
                style={{ width: 50, height: 50, borderRadius: "5px" }}
              />
            )}
          </>
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
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      align: "center",
      width: 80,
      render: (items) => items?.length,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      align: "center",
      width: 100,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
    },
  ];

  return (
    <div
      style={{
        marginTop: "20px",
        // backgroundColor: "rgb(247, 247, 247)",
        // display: "block",
        // width: "100%",
        // height: "100%",
      }}
    >
      {orderDataLoading ? (
        <Loader />
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={dataTable}
            // pagination={{
            //   position: ["bottomRight"],
            //   pageSize: pageSize,
            //   showSizeChanger: false,
            // }}
            scroll={{ x: true }}
            style={{
              width: "100%",
              borderRadius: "4px",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow:
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
            }}
            title={() => (
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "rgb(88, 88, 88)",
                }}
              >
                Recent Orders
              </div>
            )}
            sticky
            components={{
              header: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "rgb(239, 243, 245)",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  />
                ),
              },
              body: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cell: (props: any) => (
                  <td
                    {...props}
                    style={{
                      color: "rgb(88, 88, 88)",
                      backgroundColor: "rgb(255, 255, 255)",
                    }}
                  />
                ),
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RecentOrder;
