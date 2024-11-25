import "../../Categore/NestedPorductsCSS/NestedProducts.css";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { useGetProductsWithSearchFilterQuery } from "../../../../redux/features/product/productApi";
import { useState } from "react";
import { Col, Pagination, Row, Select } from "antd";
import NestedProduct from "../../Categore/NestedPorduct/NestedProduct";
import { TProduct } from "../../../../types/product.types";
import Loader2 from "../../../shared/loader/Loader2";
import Loader from "../../../shared/loader/Loader";

const { Option } = Select;
const HealthBeautyCategore = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("");
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsWithSearchFilterQuery({
    limit: pageSize,
    page: currentPage,
    sort: sortOption,
    mainCategory: "Health & Beauty",
  });

  const productQuantity = products?.meta?.total;

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSortChange = (value: string) => {
    // Update sort option based on user selection
    if (value === "Best Selling") {
      setSortOption("soldQuantity"); // Sort by sold quantity
    } else if (value === "Price Low to high") {
      setSortOption("price"); // Sort by price (ascending)
    } else if (value === "Price high to low") {
      setSortOption("-price"); // Sort by price (descending)
    } else {
      setSortOption(""); // Default sorting
    }
  };

  return (
    <div className="nestedProductsMain">
      <PageTitle pageTitle="Health & Beauty" />
      {/* <div className="nestedProductsBreadcrumb">
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
            <li className="breadcrumb-item active">Beayty</li>
          </ol>
        </nav>
      </div> */}
      {/* <div className="nestedProductsNamePart">
        <div>
          <h5 className="m-0 fw-bold">Beauty Products In Mahsez</h5>
        </div>
        <div>
          <p className="m-0">
            <span>Show:</span>&nbsp;
            <select className="">
              <option value="">20</option>
              <option value="">30</option>
              <option value="">40</option>
            </select>
          </p>
        </div>
      </div> */}
      <div className="nestedProductsSortByViewPart">
        <div>
          <p className="m-0">{productQuantity} Products Found In Beauty</p>
        </div>
        <div className="nestedProductsSortByViewDev">
          <Row justify="end" gutter={16}>
            <Col>
              <span>Sort By:</span>&nbsp;
              <Select
                defaultValue={"Default"}
                style={{ width: 130 }}
                onChange={handleSortChange}
              >
                <Option value={"Default"}>Default</Option>
                <Option value={"Best Selling"}>Best Selling</Option>
                <Option value={"Price Low to high"}>Price Low to high</Option>
                <Option value={"Price high to low"}>Price high to low</Option>
              </Select>
            </Col>
            <Col>
              <Select
                defaultValue={20}
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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "380px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {isFetching && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 1,
              }}
            >
              <Loader2 />
            </div>
          )}
          <div
            className="nestedProducts"
            style={{ opacity: isFetching ? 0.5 : 1 }}
          >
            {products?.data?.map((product: TProduct, index: number) => (
              <div
                key={product._id}
                className="delayProductItem"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NestedProduct {...product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading || productQuantity < 21 ? (
        ""
      ) : (
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
      )}
    </div>
  );
};

export default HealthBeautyCategore;
