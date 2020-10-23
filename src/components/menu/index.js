import React from 'react';
import { Link } from 'react-router-dom';

import Filter from './parts/filter';

import './style.scss';
import logo from 'static/images/logo.svg';

const Menu = () => {
    return (
        <div className="menu_wrap">
            <div className="menu_content">
                <Link to={'/'} className="menu_logo">
                    <img src={logo} alt="stihi.io" />
                </Link>
                <div className="menu_auth">
                    <div>Вход</div>
                    <div className="menu_auth_signup">Авторизация</div>
                </div>
            </div>
            <Filter />
        </div>   
    )
}

export default Menu;