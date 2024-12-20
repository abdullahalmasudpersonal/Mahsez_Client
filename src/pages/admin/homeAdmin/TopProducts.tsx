import { Table, TableColumnsType } from "antd";
import { useGetProductsWithSearchFilterQuery } from "../../../redux/features/product/productApi";
import Loader from "../../shared/loader/Loader";
import { Link } from "react-router-dom";
import { TProduct } from "../../../types/product.types";
import { useEffect } from "react";

const TopProducts = () => {
  const { data: productData, isLoading: loadingProduct } =
    useGetProductsWithSearchFilterQuery({ sort: "-soldQuantity", limit: 5 });

  useEffect(() => {
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
          {item?.image?.slice(0, 1).map((img: string) => (
            <img
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
      title: "sale",
      dataIndex: "soldQuantity",
      key: "soldQuantity",
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
            title={() => <h5 style={{ margin: 0 }}>Top Products</h5>}
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

export default TopProducts;
