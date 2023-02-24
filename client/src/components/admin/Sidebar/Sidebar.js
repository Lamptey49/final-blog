import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item.jsx';


import logo from '../../../assets/images/logo.png';
import LogoutIcon from '../../../assets/icons/logout.svg';

function SideBar ({ menu }) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu && menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    })

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img
                        src={logo}
                        alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu && menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    {/* <div className='sidebar-footer'>
                        <span className='sidebar-item-label'>Logout</span>
                        
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default SideBar;