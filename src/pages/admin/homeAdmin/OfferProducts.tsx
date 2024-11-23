import { useEffect } from "react";
import Loader from "../../shared/loader/Loader";
import { Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { TProduct } from "../../../types/product.types";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";

const OfferProducts = () => {
  const { data: productData, isLoading: loadingProduct } = useGetProductsQuery(
    {}
  );

  useEffect(() => {
    // এখানে CSS `ant-table-body`-তে অ্যাপ্লাই হবে।
    const style = document.createElement("style");
    style.innerHTML = `
          .ant-table-body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, এবং Edge এর জন্য scrollbar লুকাবে */
          }
          .ant-table-body {
            scrollbar-width: none; /* Firefox এর জন্য scrollbar লুকাবে */
            -ms-overflow-style: none; /* IE এর জন্য scrollbar লুকাবে */
          }
        `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const dataTable = productData?.data
    ?.slice(0, 5)
    ?.map(
      ({
        _id,
        name,
        category,
        price,
        availableQuantity,
        brand,
        image,
      }: TProduct) => ({
        key: _id,
        name,
        category,
        price,
        brand,
        availableQuantity,
        image,
      })
    );

  const columns: TableColumnsType<TProduct> = [
    {
      title: "Product Name",
      key: "name",
      width: 300,
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.image?.[0]}
            alt={item.name}
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
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
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      align: "center",
      width: 100,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        width: "50%",
      }}
    >
      {loadingProduct ? (
        <Loader />
      ) : (
        <div>
          <Table
            title={() => <h5 style={{ margin: 0 }}>Offers Products</h5>}
            columns={columns}
            dataSource={dataTable}
            pagination={false}
            scroll={{ x: true }}
            style={{ overflowX: "auto" }}
            sticky
          />
          <style>
            {`
        .ant-table-body::-webkit-scrollbar {
          display: none; /* Chrome, Safari এবং Edge এর জন্য Scroll Bar লুকাবে */
        }
      `}
          </style>
        </div>
      )}
    </div>
  );
};

export default OfferProducts;
