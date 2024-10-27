import React from 'react';
import Slider from "react-slick";
import UseBlgos from '../../../Hooks/UseBlogs/UseBlogs';
import Blog from '../../Blogs/Blog/Blog';

const HomeBlogs = () => {
    const [blogs, setBlogs] = UseBlgos([]);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", background: "green" }}
                onClick={onClick}
            />
        );
    }

   var settings = {
        autoplay: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div>
            <h5 className="homefeaturedCategore-title">FROM OUR BLOG</h5>
            <hr style={{ marginTop: '10px' }}></hr>
            <Slider {...settings} >
                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog} />)
                    }
            </Slider>
        </div>
    );
};

export default HomeBlogs;