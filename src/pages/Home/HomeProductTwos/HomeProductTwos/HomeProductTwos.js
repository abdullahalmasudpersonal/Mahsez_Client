import React from 'react';
import UseProducts from '../../../../Hooks/UseProducts/UseProducts';
import HomeProduct from '../../HomeProduct/HomeProduct';

const HomeProductTwos = () => {
    const [products, setProducts] = UseProducts([]);

    return (
        <div>
            <h5 className="homefeaturedCategore-title">BESTSELLING PRODUCTS</h5>
            <hr style={{ marginTop: '10px' }}></hr>
            <div className='homeProducts'>
                {
                    products/* .filter(categore => categore.category === 'attar') */.slice(0, 12).map(product => <HomeProduct key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default HomeProductTwos;