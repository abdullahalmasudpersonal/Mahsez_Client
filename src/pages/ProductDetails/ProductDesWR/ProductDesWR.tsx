import { Rate } from "antd";
import { useGetSingleProductReviewQuery } from "../../../redux/features/review/reviewApi";
import { TProduct } from "../../../types/product.types";
import { TReview } from "../../../types/review.types";
import "./ProductDesWR.css";
import { format } from 'date-fns';

type ProductDesWRProps = {
  productDetails: {
    data: TProduct;
  };
};

const ProductDesWR = ({ productDetails }: ProductDesWRProps) => {
  const { data: getSingleProductReview } = useGetSingleProductReviewQuery(productDetails?.data?._id);
  const { description } = productDetails?.data || {};
  const reviews = getSingleProductReview?.data || {};

  console.log("getSingleProductReview", reviews,)


  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Description
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Warranty Info
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Reviews
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: description }} />

        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {/* <div style={{padding:'10px'}} dangerouslySetInnerHTML={{ __html: warranty }} /> */}
        </div>
        <div
          className="tab-pane fade review"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <h4>{reviews?.length} Reviews</h4>
          <p style={{ marginBottom: '20px' }}>Get specific details about this product from customers who own it.</p>
          {reviews?.length ? (
            reviews.map((review: TReview) => (
              <div key={review.reviewId} style={{ borderBottom: '1px solid rgb(233, 233, 233)', marginBottom: '30px' }}>
                <Rate style={{ color: 'orange', fontSize: '18px',marginBottom:"10px" }} value={review.rating} disabled />
                <h6>{review.displayName} <small style={{ color: 'gray', fontSize: "12px", }}>
                  {review.updatedAt ? format(new Date(review.updatedAt), 'dd MMM yyyy') : 'No update date'}
                </small>
                </h6>
                <p style={{ marginBottom: '30px' }}>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDesWR;

/* 

<div id="exTab2" className='attar-detail-desWR'>
            <ul className="attar-detail-desWR-head nav nav-tabs">
                <li className="active"  >
                    <a href="#1" data-toggle="tab">DESCRIPTION</a>
                </li>
                <li><a href="#2" data-toggle="tab">REVIEWS</a>
                </li>
                <li><a href="#3" data-toggle="tab">Solution</a>
                </li>
            </ul>
            <div className="tab-content attar-detail-desWR-content">
                <div className="tab-pane active" id="1">
                    <h3>Standard tab panel created on bootstrap using nav-tabs</h3>
                </div>
                <div className="tab-pane" id="2">
                    <h3>Notice the gap between the content and tab after applying a background color</h3>
                </div>
                <div className="tab-pane" id="3">
                    <h3>add clearfix to tab-content (see the css)</h3>
                </div>
            </div>
        </div>



*/
