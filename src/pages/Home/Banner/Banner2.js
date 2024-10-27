import React from 'react';
import bannerimg from '../../../Assets/img/adBanner/adbanner.jpg';
import './Banner.css';

const Banner2 = () => {
    return (
        <div className='banner2 container-xxl p-0 my-4'>
            <img src={bannerimg} alt='' />
        </div>
    );
};

export default Banner2;