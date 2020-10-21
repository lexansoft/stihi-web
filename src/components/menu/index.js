import React from 'react';
import Filter from './parts/filter';
import './style.scss';
import logo from 'static/images/logo.svg';

const Menu = () => {
    return (
        <div className="menu_wrap">
            <div className="menu_content">
                <div className="menu_logo">
                    <img src={logo} alt="stihi.io" />
                </div>
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