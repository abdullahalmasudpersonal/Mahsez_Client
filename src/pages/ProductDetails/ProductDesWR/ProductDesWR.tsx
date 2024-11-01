import "./ProductDesWR.css";

const ProductDesWR = () => {
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
            Home
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
            Profile
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
            Contact
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
          .11.11.
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          .22222..
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ..33333.
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
