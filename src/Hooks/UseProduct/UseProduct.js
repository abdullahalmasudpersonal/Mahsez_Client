import React from 'react';
import './UsePorduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const UseProduct = ({attar}) => {
    
    const { _id, brand, name, image, regularPrice, offerPrice } = attar;
    
    const navigate = useNavigate();

    const navigateToProductDetails = _id => {
        navigate(`/categore/islamic/attar/${_id}`);
    }

    return (
        <div>
            <div className='islamic-product-dev cart1'>
           <div className='p-3 pb-2'> <img src={image} alt='' className='img-fluid' /></div>
            <h6 className='text-center islamic-product-dev-h6 mb-1' onClick={() => navigateToProductDetails(_id)}>{name}</h6>

            <p className='text-center m-0'>
                <small>4.5 </small>
                <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                <FontAwesomeIcon icon={faStar} style={{ color: 'gray', width: '13px' }} />
                <small> (27)</small>
            </p>
            <p className='text-center islamic-product-dev-p'>
                {
                    offerPrice ?
                        <p>
                            <span style={{ fontSize: '14px', fontFamily: "Optima", fontWeight: 'bold' }}>৳</span>
                            <span>{offerPrice}.00 &nbsp;</span>

                            <span style={{ fontSize: '13px', fontFamily: "Optima", fontWeight: 'bold', color: 'gray', textDecoration: 'line-through 1px' }}>৳ {regularPrice}.00</span>
                        </p>
                        :
                        <span><span style={{ fontSize: '15px', fontFamily: "Optima", fontWeight: 'bold' }}>৳</span>{regularPrice}.00</span>
                }
            </p>
           {/*  <div className='d-flex justify-content-center'>
                {
                     cart.some((p) => p._id === attar._id) ?
                       <div className='islamic-product-add-to-cart'>  <button  onClick={() => handleRemoveProduct(_id)} >
                            Revove
                        </button> </div> 
                        :
                         <div className='islamic-product-add-to-cart'>  <button onClick={() => handleAddToCard(attar)} >
                            Add to Cart
                        </button> </div> 
                }
            </div> */}
        </div>
        </div>
    );
};

export default UseProduct;