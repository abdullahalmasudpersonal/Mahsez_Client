import { Outlet } from "react-router-dom";
import "./Categore.css";
import NestedCategore from "../NestedCategore/NestedCategore/NestedCategore";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons';

const Categore = () => {
  return (
    <>
      {/*   <div className='breadcrumb-bg'>
                <div className='container-xxl'>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 ">
                            <li class="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} className='breadcrumb-home-btn' /></Link></li>
                            <li class="breadcrumb-item"><Link to='/cart' className='breadcrumbItem'>Shopping Cart</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div> */}
      <div className="m-0 p-0 home-bg">
        <div className="container-xxl py-3 d-flex responsive-nested-page">
          <NestedCategore />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Categore;
