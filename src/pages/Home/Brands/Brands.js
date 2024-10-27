import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import Slider from "react-slick";
import './Brands.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick, currentSlide } = props;
    return (
        <>

            {style && (
                <div className={className} onClick={onClick}>
                    <div className={className} onClick={onClick}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} style={{ color: 'blue', fontSize: '30px', marginLeft:'40px', marginTop:'-30px'  }} />
                    </div>
                    {/*  <FontAwesomeIcon icon={faChevronLeft} style={{ color: 'red', fontSize: '30px', background:'orange', marginLeft:'20px', marginTop:'-20px' }} /> */}
                </div>
            )}
            {/* <div
            className={className}
            style={{ ...style, display: "block", fontSize:'50px', marginLeft:'',background: "gray", color:'red', padding:'' }}
            onClick={onClick}
        /> */}
        </>

    );
}

export default class Responsive extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            autoplay: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="container-xxl p-0 my-5 " >
                {/*  <button className="button" onClick={this.next}>
                    Next
                </button> */}
                <Slider {...settings} className=''>
                    <div>
                        <img src="http://localhost:3000/static/media/adbanner.2119d6c625ac798a9584.jpg" />
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                    <div>
                        <h3>7</h3>
                    </div>
                    <div>
                        <h3>8</h3>
                    </div>
                </Slider>
                {/* <button className="button" onClick={this.previous}>
                    Previous
                </button> */}
                {/*  <div style={{}} className='d-flex justify-content-between'>
                    <button className="button" onClick={this.previous}>
                        Previous
                    </button>
                    <button className="button" onClick={this.next}>
                        Next
                    </button>
                </div> */}
            </div>
        );
    }
}