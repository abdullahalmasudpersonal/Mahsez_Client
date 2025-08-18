import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomeMenu.css';
import {
    faBowlFood,
    faChevronRight,
    faComputer,
    faMicrochip,
    faMosque,
    faPersonDress,
    faShoppingBag,
    faTrophy,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
const HomeMenu = () => {
    const menus = [
        { id: 1, icon: faUserDoctor, name: 'Health & Beauty', to: "/categore/health-beauty" },
        { id: 2, icon: faShoppingBag, name: 'Bags & Watchs', to: "/categore/bag-watch" },
        { id: 3, icon: faComputer, name: 'Computers Access...', to: "/categore/computer-accessories" },
        { id: 4, icon: faPersonDress, name: 'Dresses & Jewellery', to: "/categore/dress-jewellery" },
        { id: 5, icon: faMicrochip, name: 'Electronic & TV', to: "/categore/electronics-tv" },
        { id: 6, icon: faBowlFood, name: 'Home Appliences', to: "/categore/homeApplience" },
        { id: 7, icon: faBowlFood, name: 'Kids Accessories', to: "/categore/kidsAccessories" },
        { id: 8, icon: faBowlFood, name: 'Groceries & Foods', to: "/categore/groceries-foods" },
        { id: 9, icon: faMosque, name: 'Islamic Accessories', to: "/categore/islamic" },
        { id: 10, icon: faTrophy, name: 'Sports & Outdoors', to: "/categore/sports-outdoors" },
    ]
    return (
        <div className='homeMenu'>
            {
                menus.map((menu) => (
                    <div key={menu?.id} className='menuItemDiv'>
                        <Link to={menu.to} style={{textDecoration:'none'}}>
                            <div className='menuItem' key={menu.id}>
                                <div>
                                    <FontAwesomeIcon icon={menu.icon} className="menuItemIcon" />
                                    <span>{menu.name}</span>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight} className="homeMenuChevronIcon" />
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default HomeMenu;