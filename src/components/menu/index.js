import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Filter from './parts/filter';
import { getUserId, getAuthToken } from 'utils';

import './style.scss';

const Menu = () => {
    const token = useSelector((state) => state.auth.token) || getAuthToken();
    const dispatch = useDispatch();
    const openModal = (content) => dispatch.modal.toggle({ show: true, content });
    const user = useSelector((state) => state.auth.user);
    const cashId = token ? getUserId() : '';
    const id = user.id;
    const battory = useSelector((state) => state.auth.battory);
    const logout = () => {
        dispatch.auth.logout();
    }

    useEffect(() => {
        if (id || cashId) {
            if (!id) {
                dispatch.auth.fetchUserInfo({ id: cashId });
            } else {
                dispatch.auth.fetchUserInfo({ id });
            }
            dispatch.auth.fetchBattory();
        }
    }, [dispatch, id, token]);

    return (
        <div className="menu_wrap">
            <div className="menu_content">
                <Link to={'/'} className="menu_logo">
                    <img src='static/images/logo.svg' alt="stihi.io" />
                </Link>
                {!user.id 
                    ?   <div className="menu_auth">
                            <div className="menu_auth_signin" onClick={() => openModal('sign_in')}>Вход</div>
                            <div className="menu_auth_signup" onClick={() => openModal('cyberway')}>Регистрация</div>
                        </div>
                    :   <div className="menu_auth">
                            <div>
                                <div>{user.nickname}</div>
                                <div>{battory}% энергии</div>
                            </div>
                            <Link to={`/@${user.nickname}`}><img width={80} src={user.avatar || 'static/images/avatar_default.png'} /></Link>
                            <button onClick={logout}>Выйти</button>
                        </div>
                }
            </div>
            <Filter token={token}/>
        </div>   
    )
}

export default Menu;