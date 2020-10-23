import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';

import moment from 'moment';

import './style.scss';

const mainType = "main";

const List = () => {
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.list.articles);
    const dispatch = useDispatch();
    const location = useLocation();
    const urlList = location.pathname.split('/');
    const category = urlList[urlList ?  urlList.length - 1 : ''];
    const isMainPage = !Boolean(category);

    console.log({category})

    useEffect(() => {
        dispatch.list.fetchAnnounces({
            count: isMainPage ? 20 : 3,
            page_code: isMainPage ? mainType : category,
            type: isMainPage ? mainType : category
        });

        if (!isMainPage) {
            dispatch.list.fetchArticles({
                count: 20,
                type: isMainPage ? mainType : category,
            });
        }
    }, [dispatch, category]);

    return (
        <div className="list_wrap">
            {isMainPage ? <div className="list_title">Литературный портал на блокчейне, пространство свободной публикации и общения между авторами и читателями.</div> : null}
            {announces.length 
                ? <div className="list_box">
                    <div className="list_box_content">
                        <div className="list_box_title">Анонсы</div>
                            {announces.map((el) => (
                                <div className="list_box_item" key={el.id}>
                                    <Link to={`/posts/${el.id}`} className="list_box_item-image">
                                        <img src={el.image} alt="image" />
                                    </Link>
                                    <div className="list_box_item-text">
                                        <Link to={`/posts/${el.id}`} className="list_box_item-title">{el.title}</Link>
                                        <Link to={`/posts/${el.id}`} className="list_box_item-descrition">{el.body}</Link>
                                        <div className="list_box_info">
                                            <div>{el.user.nickname}</div>
                                            <div>{moment(el.time).format('DD/MM/YYYY, HH:mm')}</div>
                                            <div>Нравится {el.votes_count}</div>
                                        </div>
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>
                : null
            }

            {articles.length 
                ? <div className="list_box">
                    <div className="list_box_content">
                            {articles.map((el) => (
                                <div className="list_box_item" key={el.id}>
                                    <Link to={`/posts/${el.id}`} className="list_box_item-image">
                                        <img src={el.image} alt="image" />
                                    </Link>
                                    <div className="list_box_item-text">
                                        <Link to={`/posts/${el.id}`} className="list_box_item-title">{el.title}</Link>
                                        <Link to={`/posts/${el.id}`} className="list_box_item-descrition">{el.body}</Link>
                                        <div className="list_box_info">
                                            <div>{el.user.nickname}</div>
                                            <div>{moment(el.time).format('DD/MM/YYYY, HH:mm')}</div>
                                            <div>Нравится {el.votes_count}</div>
                                        </div>
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>
                : null
            }
        </div>
    )
};

export default List;