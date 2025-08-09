import {
  faBorderNone,
  faFilter,
  faHome,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import NestedProduct from "../../../Categories/Categore/NestedPorduct/NestedProduct";
// import { useSearchProductsQuery } from "../../../../redux/features/product/productApi";
import { TProduct } from "../../../../types/product.types";
import { useGetProductsQuery } from "../../../../redux/features/product/productApi";
import PageTitle from "../../PageTitle/PageTitle";

const SearchBerResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm") || "";

  const { data: productDta } = useGetProductsQuery(searchTerm, {
    skip: !searchTerm,
  });


  return (
    <div className="nestedProductsMain">
      <PageTitle pageTitle={`${searchTerm} |`} />
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
              Search Results
            </li>
          </ol>
        </nav>
      </div>
      <div className="nestedProductsNamePart">
        <div>
          <h5 className="m-0 fw-bold">Search Result ...</h5>
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
      </div>
      <div className="nestedProductsSortByViewPart">
        <div className="nestedProductsSearchResult">
          {/* <p className="m-0">
            {searchValuse ? <>{nestedProductsLength}</> : <>0</>} Products Found
            In "
            <span
              data-toggle="tooltip"
              data-placement="right"
              title={searchValuse}
            >
              {searchValuse.length > 30
                ? searchValuse.slice(0, 30) + "..."
                : searchValuse}
            </span>
            "
          </p> */}
        </div>
        {/* small display show filter */}
        <div className="nestedproductSmallScreenFilter">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <FontAwesomeIcon icon={faFilter} />
            &nbsp;<span>Filter</span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Offcanvas right</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">...</div>
          </div>
        </div>
        <div className="nestedProductsSortByViewDev">
          <p className="m-0">
            <span className="">Sort By:</span>&nbsp;
            <select>
              <option value="">Default</option>
              <option value="">A TO Z</option>
              <option value="">Z TO A</option>
              <option value="">Best Selling</option>
              <option value="">Price Low to high</option>
              <option value="">Price high to low</option>
            </select>
          </p>{" "}
          &nbsp;&nbsp;&nbsp;
          <p className="m-0 d-flex justify-content-center align-items-center">
            <span>View As:</span> &nbsp;&nbsp;
            <FontAwesomeIcon
              color="rgb(42, 42, 42))"
              fontSize="20px"
              style={{ padding: "5px" }}
              icon={faBorderNone}
            />{" "}
            &nbsp;
            <FontAwesomeIcon
              fontSize="20px"
              style={{ padding: "5px" }}
              icon={faList}
            />
          </p>
        </div>
      </div>
      <div className="nestedProducts">
        {searchTerm ? (
          productDta?.data?.map((nestedProduct: TProduct) => (
            <NestedProduct {...nestedProduct}></NestedProduct>
          ))
        ) : (
          <p className="">No Porducts Found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBerResult;
