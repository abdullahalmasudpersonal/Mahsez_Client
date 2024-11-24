import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useGetProductsWithSearchFilterQuery } from "../../../../redux/features/product/productApi";
import { TProduct } from "../../../../types/product.types";
import NestedProduct from "../../Categore/NestedPorduct/NestedProduct";
import { Col, Pagination, Row, Select } from "antd";
import { useState } from "react";

const { Option } = Select;
const IslamicCategore = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products } = useGetProductsWithSearchFilterQuery({
    limit: pageSize,
    page: currentPage,
  });

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="nestedProductsMain">
      <PageTitle pageTitle="Islamic" />
      <div className="nestedProductsBreadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 ">
            <li className="breadcrumb-item">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faHome}
                  className="breadcrumb-home-btn"
                />
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Islamic
            </li>
          </ol>
        </nav>
      </div>
      <div className="nestedProductsSortByViewPart">
        <div>
          <p className="m-0">
            {/* {nestedProductsLength} */} Products Found In Islamics
          </p>
        </div>
        <div className="nestedProductsSortByViewDev">
          <Row justify="end" gutter={16}>
            <Col>
              <span>Sort By:</span>&nbsp;
              <Select
                defaultValue={10}
                style={{ width: 130 }}
                // onChange={handlePageSizeChange}
              >
                <Option value={""}>Default</Option>
                <Option value={""}>A TO Z</Option>
                <Option value={""}>Z TO A</Option>
                <Option value={""}>Best Selling</Option>
                <Option value={""}>Price Low to high</Option>
                <Option value={""}>Price high to low</Option>
              </Select>
            </Col>
            <Col>
              <Select
                defaultValue={10}
                style={{ width: 70 }}
                onChange={(value) => setPageSize(value)}
              >
                <Option value={20}>20</Option>
                <Option value={30}>30</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
      <div className="nestedProducts">
        {products?.data?.map((product: TProduct) => (
          <NestedProduct {...product}></NestedProduct>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Pagination
          total={products?.meta?.total}
          current={currentPage}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default IslamicCategore;
