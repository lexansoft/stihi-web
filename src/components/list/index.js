import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams, useLocation } from 'react-router-dom';

import moment from 'moment';

import './style.scss';

const mainType = "main";

const rednderPost = ({data, title = '', location}) => {
    return (
        <div className="list_box">
            <div className="list_box_content">
                {title ? <div className="list_box_title">{title}</div> : null}
                {data.map((el) => (
                    <div className="list_box_item" key={el.id}>
                        <Link to={`/item/${location}/${el.id}`} className="list_box_item-image">
                            <img src={el.image} alt="image" />
                        </Link>
                        <div className="list_box_item-text">
                            <Link to={`/item/${location}/${el.id}`} className="list_box_item-title">{el.title}</Link>
                            <Link to={`/item/${location}/${el.id}`} className="list_box_item-descrition">{el.body}</Link>
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
    )
};

const List = () => {
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.list.articles);
    const dispatch = useDispatch();
    const params = useParams();
    const { id, rubric } = params;
    const isMainPage = useLocation().pathname.length === 1;
    const location = !isMainPage ? (id || '') + (rubric ? `/${rubric}` : '') : 'main';

    useEffect(() => {
        dispatch.list.fetchAnnounces({
            count: isMainPage ? 20 : 3,
            page_code: isMainPage ? mainType : id,
            type: isMainPage ? mainType : id,
            tags: rubric ? [rubric] : []
        });

        if (!isMainPage) {
            dispatch.list.fetchArticles({
                count: 20,
                type: isMainPage ? mainType : id,
                rubrics: rubric ? [rubric] : []
            });
        }
    }, [dispatch, id, rubric]);

    return (
        <div className="list_wrap">
            {isMainPage 
                ?   <div className="list_title">Литературный портал на блокчейне, пространство свободной публикации и общения между авторами и читателями.</div> 
                :    null}
            {announces.length 
                ?   rednderPost({ 
                        data: announces, 
                        title: 'Анонсы',
                        location
                    }) 
                : null}
            {articles.length 
                ?   rednderPost({ 
                        data: articles,
                        location
                    })
                :   null}
        </div>
    )
};

export default List;