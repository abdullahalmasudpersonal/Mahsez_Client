import "./Banner.css";
import smallBanner4 from "../../../../public/assets/img/banner/banner2/banner (2).jpg";
import smallBanner5 from "../../../../public/assets/img/banner/banner2/banner (3).jpg";
import banner from "../../../../public/assets/img/banner/banner.jpg";
import banner2 from "../../../../public/assets/img/banner/banner2.jpg";
import banner3 from "../../../../public/assets/img/banner/banner3.jpg";
import { Carousel } from "antd";

const Banner = () => {
  const banners = [
    { id: "1", img2: banner, img: 'https://www.startech.com.bd/image/cache/catalog/home/banner/2025/benq-monitor-982x500.webp' },
    { id: "2", img2: banner2, img: "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/Sony-WH-1000XM6-Noise-Cancelling-Wireless-Headphone-(Official)-982x500.webp" },
    { id: "3", img2: banner3, img: "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/star-link-home-2025-banner-982x500.webp" },
    { id: "4", img2: banner, img: 'https://www.startech.com.bd/image/cache/catalog/home/banner/2025/bkash-offer-web-banner-982x500.webp' },
  ]

  const smallBanners = [
    { id: "1", img2: smallBanner4, img: 'https://www.startech.com.bd/image/cache/catalog/home/banner/2025/benq-monitor-982x500.webp' },
    { id: "2", img2: smallBanner5, img: "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/Sony-WH-1000XM6-Noise-Cancelling-Wireless-Headphone-(Official)-982x500.webp" },
  ]


  return (
    <div className="banner">
      <div className="bannerLaftPart">
        <Carousel arrows autoplay effect="fade" >
          {
            banners.map((banner) => (
              <div key={banner.id}>
                <img src={banner.img} alt="banner img" className="bannerImg" />
              </div>
            ))
          }
        </Carousel>
      </div>
      <div className="bannerRightPart">
        {
          smallBanners.slice(0, 2).map((banner) => (
            <div key={banner.id}>
              <img src={banner.img2} alt="small-banner" style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Banner;
