import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

const List = () => {
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.list.articles);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch.list.fetchAnnounces({
            count: 3,
            page_code: "new",
            type: "new"
        });
        dispatch.list.fetchArticles({
            count: 20,
            type: "new"
        });
    }, [dispatch]);

    return (
        <div className="list_wrap">
            <div className="list_title">Литературный портал на блокчейне, пространство свободной публикации и общения между авторами и читателями.</div>
            {announces.length 
                ? <div className="list_box">
                    <div className="list_box_content">
                        <div className="list_box_title">Анонсы</div>
                            {announces.map((el) => (
                                <div className="list_box_item" key={el.id}>
                                    <div className="list_box_item-image">
                                        <img src={el.image} alt="image" />
                                    </div>
                                    <div className="list_box_item-text">
                                        <div className="list_box_item-title">{el.title}</div>
                                        <div className="list_box_item-descrition">{el.body}</div>
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
                                    <div className="list_box_item-image">
                                        <img src={el.image} alt="image" />
                                    </div>
                                    <div className="list_box_item-text">
                                        <div className="list_box_item-title">{el.title}</div>
                                        <div className="list_box_item-descrition">{el.body}</div>
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