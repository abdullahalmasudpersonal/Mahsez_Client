import "./ProductDetailReVe.css";

const ProductDetailReVe = () => {
  return (
    <div id="exTab2" className="productDetailReVe mt-5">
      <ul className="productDetailReVe-head nav nav-tabs">
        <li className="active list">
          <a href="#relatedProducts" data-toggle="tab">
            RELATED PRODUCTS
          </a>
        </li>
        <li>
          <a href="#customerViewed" data-toggle="tab">
            CUSTOMERS ALSO VIEWED
          </a>
        </li>
      </ul>

      <div className="tab-content productDetailReVe-content">
        <div className="tab-pane active" id="relatedProducts">
          {/*    <Attars/> */}
        </div>

        <div className="tab-pane" id="customerViewed">
          <h5>CUSTOMERS ALSO VIEWED</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReVe;
