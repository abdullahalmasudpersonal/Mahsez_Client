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
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProdcutsQuery,
} from "../../../../redux/features/product/productApi";
import { TProduct } from "../../../interface/product.Interface";
import { TQueryParam } from "../../../../types/global";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Loader from "../../../shared/loader/Loader";
import { toast } from "sonner";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
// ];

// const data = Array.from({ length: 100 }, (_, i) => ({
//   key: i,
//   name: `John Doe ${i}`,
//   age: 30 + (i % 10),
//   address: `Street ${i}, City`,
// }));

const { Option } = Select;

const ListProducts = () => {
  const [pageSize, setPageSize] = useState(10);
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const { data: productData, isLoading: loadingProduct } =
    useGetProdcutsQuery(params);
  const [deleteSingleProduct] = useDeleteProductMutation();

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const deleteProduct = async (productId: string) => {
    const res = await deleteSingleProduct(productId).unwrap();
    if (res?.success) {
      toast.success("Delete prodcuct successfully!", {
        duration: 1000,
        position: "top-right",
      });
    }
  };

  const dataTable = productData?.data?.map(
    ({ _id, name, category, price, availableQuantity, image }: TProduct) => ({
      key: _id,
      name,
      category,
      price,
      availableQuantity,
      image,
    })
  );

  const columns: TableColumnsType<TProduct> = [
    {
      title: "Product Name",
      key: "name",
      width: 300,
      render: (record: TProduct) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image?.[0]}
            alt={record.name}
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <span>{record.name}</span>
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
      title: "Action",
      key: "category",
      align: "center",
      render: (item) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button color="primary" variant="filled">
              <EyeOutlined />
            </Button>
            <Button
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
    <div className="dashboard-dev2" style={{ overflowX: "auto" }}>
      <PageTitle pageTitle="List || Products || Admin" />
      <div className="pt-4 px-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">
          All Product List ({productData?.data?.length})
        </h4>
        <Row justify="end" style={{ marginBottom: 16 }}>
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

      {loadingProduct ? (
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
            scroll={{ x: true, y: 500 }}
            style={{ width: "100%" }}
            sticky
          />
        </div>
      )}
    </div>
  );
};

export default ListProducts;
