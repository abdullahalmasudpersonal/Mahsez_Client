import React from 'react';
import UseAttars from '../../../Hooks/UseAttars/UseAttars';
import '../Home/HomeProducts.css';
import Attar from '../../Categories/Islamic/Attars/Attar/Attar';

const HomeIslamic = () => {
    const [attars, setAttars] = UseAttars([]);

    return (
        <div className='homeProducts'>
            {
                attars.filter(categore => categore.category === 'attar').map(attar => <Attar key={attar._id} attar={attar} />)
            }
        </div>
    );
};

export default HomeIslamic;









































































































/* import React from 'react';
import './HomeIslamic.css';
import '../../Home/Home/Home.css';
import homeIslamicimg from '../../../Assets/img/home/Islamic.jpg';
import useAttar from '../../../Hooks/UseAttars/UseAttars';
import HomeAttar from '../../Categories/Islamic/Attar/HomeAttar';
import IslamicBest from './IslamicSlicks/IslamicBest';
import Slider from 'react-slick';
import Attar from '../../Categories/Islamic/Attar/Attar';

const HomeIslamic = () => {
    const [attars, setAttars] = useAttar([]);

    var settings = {
        dots: true,
        infinite: true,
        
        slidesToShow: 6,
        slidesToScroll: 1
        
    };

    return (
        <div className='container-xxl px-0 my-5 hoemIslamic'>

            <div className='hoemIslamic-part1'>
                <div className='hoemIslamic-title-dev'>
                    <h5 className='hoemIslamic-title-dev-h5 m-0'>ISLAMIC</h5>
                </div>
                <img src={homeIslamicimg} alt='' />
            </div>

            <div id="exTab2" className='hoemIslamic-part2'>
                <ul className="hoemIslamic-part2-head nav nav-tabs">
                    <li className="active">
                        <a href="#1" data-toggle="tab">BESTSELLING</a>
                    </li>

                    <li><a href="#2" data-toggle="tab">FEATURED</a>
                    </li>

                    <li><a href="#3" data-toggle="tab">NEW ARRIVALS</a>
                    </li>
                    <li><a href="#4" data-toggle="tab">TOP REVIEWED</a>
                    </li>
                </ul>
                <div className="tab-content hoemIslamic-part2-content">
                    <div className="tab-pane active" id="1">
                         use css only home products home.css file 
                       
                         .filter(categore => categore.category === 'attars') 
                        <div className='home-products-dev'>
                            {
                                attars.map(attar => <HomeAttar key={attar._id} attar={attar} />)
                            }
                        </div> 
                    </div>

                    <div className="tab-pane" id="2">
                        <h3>Notice the gap between the content and tab after applying a background color</h3>
                    </div>

                    <div className="tab-pane" id="3">
                        <h3>add clearfix to tab-content (see the css)</h3>
                    </div>
                    <div className="tab-pane" id="4">
                        <h3>Top reviewd clearfix to tab-content (see the css)</h3>
                    </div>
                </div>
            </div >


        </div >
    );
};

export default HomeIslamic;

{/*             <div className='d-flex'>
                <img src={homeIslamicimg} alt='' />

                <div className='home-attars'>
                    <div className='home-attars-dev'>
                        {
                            attars.map(attar => <Attar key={attar._id} attar={attar} />)
                        }
                    </div>
                </div>
            </div> */