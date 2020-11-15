import React from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';

const UserBlog = () => {
    const { login } = useParams();

    return (
        <div className="user-blog">
            <div className="user-blog_content">
                <div className="user-blog_banner">
                    <div className="user-blog_preview">
                        <img className="user-blog_avatar"src="static/images/avatar_default.png" />
                        <div>
                            <div className="user-blog_login">{login}</div>
                            <div className="user-blog_login">25</div>

                        </div>
                    </div>
                    <img className="user-blog_bg" src="static/images/banner.jpg" />
                </div>
            </div>
        </div>
    )
}

export default UserBlog;