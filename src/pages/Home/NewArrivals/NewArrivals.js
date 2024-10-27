import React from 'react';
import './NewArrivals.css';
import UseProducts from '../../../Hooks/UseProducts/UseProducts';
import HomeProduct from '../HomeProduct/HomeProduct';

const NewArrivals = () => {
    const [products, setProducts] = UseProducts([]);

    return (
        <div className='mb-2'>
            <h5 className="homefeaturedCategore-title">NEW ARRIVALS</h5>
            <hr style={{ marginTop: '10px' }}></hr>
            <div className='homeProducts newArrival-dev'>
                {
                    products.slice(0-6).reverse().map(product => <HomeProduct key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default NewArrivals;