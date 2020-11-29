import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BlogNavigation from './parts/blog-navigation';
import List from "components/list";

import './style.scss';

const UserBlog = () => {
    const dispatch = useDispatch();
    const { login, tags } = useParams();
    const blog = useSelector((state) => state.userBlog.blog);
    const authId = useSelector((state) => state.auth.user.id);
    const token = useSelector((state) => state.auth.token);
    const id = blog.id;
    const rubrics = useSelector((state) => state.userBlog.rubrics);
    const isProfile = id === authId;
    const subscribe = () => {
        dispatch.userBlog.postSubscribeUser({
            user_id: id
        });
    };

    useEffect(() => {
        dispatch.userBlog.fetchBlogInfo({
            name: login
        });
    }, [login]);

    return (
        <div className="user-blog">
            <div className="user-blog_content">
                <div className="user-blog_banner">
                    <div className="user-blog_preview">
                        <img className="user-blog_avatar"src={blog.avatar || 'static/images/avatar_default.png'} />
                        <div>
                            <div className="user-blog_login">{blog.nickname}</div>
                        </div>
                    </div>
                    <img className="user-blog_bg" src="static/images/banner.jpg" />
                </div>
                <BlogNavigation id={id} />
                <div className="user-blog_layout">
                    <div>
                        <div className="user-blog_info">
                            <div className="user-blog_info_content">
                                <div>
                                    {token ? !isProfile ? <div onClick={subscribe}>Подписаться</div> : null : null}
                                    <div>О себе</div>
                                    <div>{blog.biography}</div>
                                    {blog.web_site ? <div>Вебсайт :{blog.web_site}</div> : null }
                                </div>
                            </div>
                        </div>
                        <div className="user-blog_info">
                            <div className="user-blog_info_content">
                                <div>Рубрики блога</div>
                                {
                                    rubrics.map((el, key) => (
                                        el ? <Link key={`blog-rubrics-${el}-${key}`} to={`/@${login}/blog/${el}`}>{el}</Link> : null
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {id 
                            ? 
                                <List 
                                    staticPage='blog' 
                                    user_id={id} 
                                    tags={tags} 
                                /> 
                            :   null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBlog;