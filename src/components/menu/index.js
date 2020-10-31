import React from 'react';
import { Link } from 'react-router-dom';

import Filter from './parts/filter';

import './style.scss';

const Menu = () => {
    return (
        <div className="menu_wrap">
            <div className="menu_content">
                <Link to={'/'} className="menu_logo">
                    <img src='static/images/logo.svg' alt="stihi.io" />
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