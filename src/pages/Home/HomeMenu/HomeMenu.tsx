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
const HomeMenu = () => {
    const menus = [
        { id: 1, icon: faUserDoctor, name: 'Health & Beauty', },
        { id: 2, icon: faShoppingBag, name: 'Bags & Watchs', },
        { id: 3, icon: faComputer, name: 'Computers Access...', },
        { id: 4, icon: faPersonDress, name: 'Dresses & Jewellery', },
        { id: 5, icon: faMicrochip, name: 'Electronic & TV', },
        { id: 6, icon: faBowlFood, name: 'Home Appliences', },
        { id: 7, icon: faBowlFood, name: 'Kids Accessories', },
        { id: 8, icon: faBowlFood, name: 'Groceries & Foods', },
        { id: 9, icon: faMosque, name: 'Islamic Accessories', },
        { id: 10, icon: faTrophy, name: 'Sports & Outdoors', },
    ]
    return (
        <div className='homeMenu'>
            {
                menus.map((menu) => (
                    <div className='menuItemDiv'>
                        <div className='menuItem' key={menu.id}>
                            <div>
                                <FontAwesomeIcon icon={menu.icon} className="menuItemIcon" />
                                <span>{menu.name}</span>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} className="homeMenuChevronIcon" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default HomeMenu;