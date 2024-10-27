import { faL, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../../App';
import { Context } from '../../../../Context/AppContext';

const PcSearchber = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { products,setSearchValue,searchValuse } = useContext(Context);
    const navigate = useNavigate();

    const navigateToSearchResult = () => {
        navigate('/categore/search')
    }

    /* search  */
    const onChange = (event) => {
        setSearchValue(event.target.value);
    };
    const onSearch = (searchTerm) => {
        setSearchValue(searchTerm);
        if (searchValuse) {
            navigateToSearchResult();
        }

        console.log('search', searchTerm)
    };

    /*    const menuRef = useRef();
       useEffect(() => {
           let handle = (e) => {
               if(e.target) {
                   setIsOpen(false);
               }
           };
           document.addEventListener("mousedown", handle);
       }) */
    let userSearch = products.slice(0).reverse().filter(order => {
        return Object.keys(order).some(key =>
            order[key].toString().toLowerCase().includes(searchValuse.toString().toLowerCase()));
    });


    return (
        <div className='searchBerDev'>
            <div className='d-flex'>
                <input className='search-ber' placeholder='Looking your products' type='text' value={searchValuse} onChange={onChange} onClick={() => { setIsOpen(!isOpen) }} />
                <FontAwesomeIcon onClick={() => onSearch(searchValuse)} className='header2-part-2-search-icon-pc' icon={faSearch} />
            </div>
            <div className={`${isOpen ? 'searchBerSuggestDev' : 'searchBerSuggestRemove'}`}>
                {searchValuse ?
                    userSearch.slice(0, 10).map((item) =>
                        <p className='mb-0' onClick={() => onSearch(item.name)}>
                            {item.name}
                        </p>)
                    : <></>
                }
                {/*      {
                    products.filter(item => {
                        const searchTerm = searchValuse.toLowerCase();
                        const name = item.name.toString().toLowerCase().includes(searchValuse.toString().toLowerCase());
                        return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
                    }).slice(0, 10)
                        .map((item) =>
                            <p className='mb-0' onClick={() => onSearch(item.name)}>
                                {item.name}
                            </p>
                        )
                } */}
            </div>
        </div>
    );
};

export default PcSearchber;

