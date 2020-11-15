import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import PostsList from './parts/posts-list';
import Spin from 'ui/spin';

import './style.scss';

const mainType = "main";
const defaultItemsCount = 20;
const defaultAnnouncesCount = 3;

const List = () => {
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.list.articles);
    const pagination = useSelector((state) => state.list.pagination);
    const dispatch = useDispatch();
    const params = useParams();
    const { id, rubric } = params;
    const isMainPage = useLocation().pathname.length === 1;
    const location = !isMainPage ? (id || '') + (rubric ? `/${rubric}` : '') : 'main';

    const getAnnounces = (firstRequest = false) => {
        const defaultCount = isMainPage ? defaultItemsCount : defaultAnnouncesCount;
        const requestCount = firstRequest ? defaultCount : defaultCount + pagination.announces.itemsCount;
        
        dispatch.list.fetchAnnounces({
            params: {
                count: requestCount,
                page_code: isMainPage ? mainType : id,
                type: isMainPage ? mainType : id,
                tags: rubric ? [rubric] : []
            },
            firstRequest
        });
    };

    const getArticles = (firstRequest = false) => {
        const requestCount = firstRequest ? defaultItemsCount : defaultItemsCount + pagination.articles.itemsCount;
        
        dispatch.list.fetchArticles({
            params: {
                count: requestCount,
                type: isMainPage ? mainType : id,
                rubrics: rubric ? [rubric] : []
            },
            firstRequest
        });
    };

    useEffect(() => {
        getAnnounces(true);  //first request

        if (!isMainPage) {
            getArticles(true); //first request
        }
    }, [dispatch, id, rubric]);

    return (
        <div className="list_wrap">
            {isMainPage 
                ?   <div className="list_title">22ч Литературный портал на блокчейне, пространство свободной публикации и общения между авторами и читателями.</div> 
                :    null}
            {announces.length 
                ?   <PostsList
                        data={announces} 
                        title={'Анонсы'}
                        location={location}
                        hasMore={pagination.announces.hasMore}
                        fetch={isMainPage ? getAnnounces : null}
                        isList={isMainPage}
                    />
                :   <Spin />}
            {!isMainPage && articles.length 
                ?   <PostsList
                        data={articles} 
                        location={location}
                        fetch={getArticles}
                        hasMore={pagination.articles.hasMore}
                    />
                :   null}
        </div>
    )
};

export default List;