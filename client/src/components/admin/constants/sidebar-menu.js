import DashboardIcon from './../../../assets/icons/dashboard.svg';
import ShippingIcon from './../../../assets/icons/shipping.svg';
import ProductIcon from './../../../assets/icons/product.svg';
import UserIcon from './../../../assets/icons/user.svg';
import { faNewspaper, faDashboard, faBlog, faUser} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const sidebar_menu = [
    {
        id: 1,
        icon: faDashboard,
        path: '/admin',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: faNewspaper,
        path: '/admin/new/blog',
        title: 'New Blog',
    },
    {
        id: 3,
        icon: faBlog,
        path: '/admin/blogs',
        title: 'Blogs',
    },
    {
        id: 4,
        icon: faUser,
        path: '/admin/profile',
        title: 'My account',
    }
]

export default sidebar_menu;