import "./Banner.css";
import banner from "../../../assets/img/banner/banner.jpg";
import banner2 from "../../../assets/img/banner/banner2.jpg";
import banner3 from "../../../assets/img/banner/banner3.jpg";
import { Carousel } from "react-bootstrap";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <div className="banner-slide">
          {/* <div style={{height:'400px'}}>
            <img
              className="d-block w-100 h-100"
              src={banner2}
              alt="Second slide"
            />
          </div> */}

          <Carousel fade>
            <Carousel.Item className="carousel-item-size">
              <img
                className="d-block h-100 d-inline-block carousel-item-size-img"
                src={banner}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="carousel-item-size">
              <img
                className="d-block h-100 d-inline-block carousel-item-size-img"
                src={banner2}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="carousel-item-size">
              <img
                className="d-block h-100 d-inline-block carousel-item-size-img"
                src={banner3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="banner-right">
          <div className="banner-right-child-dev">
            {/* <img style={{height:'200px'}}
              className="d-block w-100 "
              src={banner2}
              alt="Third slide"
            /> */}
            <img
              className="d-block w-100  banner-right-child-dev-img"
              src={banner2}
              alt="Third slide"
            />
            <img
              className="d-block w-100 banner-right-child-dev-img"
              src={banner3}
              alt="Third slide"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

{
  /*  <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={banner}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={banner2}
                  alt="Second slide"
                />
        
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={banner3}
                  alt="Third slide"
                />
        
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel> */
}
