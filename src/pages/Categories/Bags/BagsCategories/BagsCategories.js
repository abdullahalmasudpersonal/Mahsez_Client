import { faBorderNone, faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import NestedProduct from '../../Categore/NestedPorduct/NestedProduct';
import UseProducts from '../../../../Hooks/UseProducts/UseProducts';
import { Link } from 'react-router-dom';
import PageTitle from '../../../Shared/PageTitle/PageTitle';

const BagsCategories = () => {
    const [nestedProducts, setNestedProducts] = UseProducts([]);

    const nestedProductsLength = nestedProducts.filter(categore => categore.mainCategory === 'Islamic').length;

    return (
        <div className='nestedProductsMain'>
             <PageTitle pageTitle='Bags |' />
            <div className='nestedProductsBreadcrumb'>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 ">
                        <li class="breadcrumb-item"><Link to="/"><FontAwesomeIcon icon={faHome} className='breadcrumb-home-btn' /></Link></li>
                        <li class="breadcrumb-item active">Bags</li>
                    </ol>
                </nav>
            </div>
            <div className='nestedProductsNamePart'>
                <div>
                    <h5 className='m-0 fw-bold'>Bags Products In Mahsez</h5>
                </div>
                <div>
                    <p className='m-0'><span>Show:</span>&nbsp;
                        <select className=''>
                            <option value="">20</option>
                            <option value="">30</option>
                            <option value="">40</option>
                        </select>
                    </p>
                </div>
            </div>
            <div className='nestedProductsSortByViewPart'>
                <div>
                    <p className='m-0'>{nestedProductsLength} Products Found In Bags</p>
                </div>
                <div className='nestedProductsSortByViewDev'>
                    <p className='m-0'><span>Sort By:</span>&nbsp;
                        <select>
                            <option value="">Default</option>
                            <option value="">A TO Z</option>
                            <option value="">Z TO A</option>
                            <option value="">Best Selling</option>
                            <option value="">Price Low to high</option>
                            <option value="">Price high to low</option>
                        </select>
                    </p> &nbsp;&nbsp;&nbsp;
                    <p className='m-0 d-flex justify-content-center align-items-center'><span>View As:</span> &nbsp;&nbsp;
                        <FontAwesomeIcon color='rgb(42, 42, 42))' fontSize='20px' style={{ padding: '5px' }} icon={faBorderNone} /> &nbsp;
                        <FontAwesomeIcon fontSize='20px' style={{ padding: '5px' }} icon={faList} />
                    </p>
                </div>
            </div>
            <div className='nestedProducts'>
                {
                    nestedProducts.filter(categore => categore.mainCategory === 'Islamic').slice(0).reverse().map(nestedProduct => <NestedProduct key={nestedProduct._id} nestedProduct={nestedProduct}></NestedProduct>)
                }
            </div>
        </div>
    );
};

export default BagsCategories;