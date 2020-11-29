import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import PostsList from './parts/posts-list';
import Spin from 'ui/spin';

import './style.scss';

const defaultItemsCount = 20;
const defaultAnnouncesCount = 3;

const componentParams = ({ page, id = 0, rubric = ''}) => {
    const onLoadDefaultParams = {
        defaultCount: defaultAnnouncesCount,
        type: id,
        pageCode: id, 
        fetchAnnounces: true,
        fetchArticles: true,
        requestArticlesParams: null
    };
    const data = {
        main: {
            location: 'main',
            defaultCount: defaultItemsCount,
            type: 'main',
            pageCode: 'main', 
            fetchAnnounces: true,
            fetchArticles: false,
            requestArticlesParams: null
        },
        new: onLoadDefaultParams,
        actual: onLoadDefaultParams,
        popular: onLoadDefaultParams,
        feed: {
            defaultCount: defaultAnnouncesCount,
            type: 'follow',
            pageCode: id, 
            fetchAnnounces: true,
            fetchArticles: true,
            requestArticlesParams: null
        },
        blog: {
            defaultCount: defaultAnnouncesCount,
            type: 'blog',
            pageCode: id, 
            fetchAnnounces: false,
            fetchArticles: true,
            requestArticlesParams: ({ count, type, user_id, tags }) => ({
                count,
                type: type,
                user_id,
                tags: tags ? [tags] : []
            })
        }
    }

    return data[page];
}

const MainPageList = ({
    announces, 
    location, 
    pagination, 
    getAnnounces
}) => {
    return (
        <Fragment>
            <div className="list_title">22ч Литературный портал на блокчейне, пространство свободной публикации и общения между авторами и читателями.</div>
            {announces.length 
                ?   <PostsList
                        data={announces} 
                        title={'Анонсы'}
                        location={location}
                        hasMore={pagination.announces.hasMore}
                        fetchMore={getAnnounces}
                    />
                :   <Spin />}
        </Fragment>
    )
};

const OnloadList = ({
    announces, 
    location, 
    articles,
    pagination, 
    getArticles
}) => {
    return (
        <Fragment>
            {announces.length 
                ?   <PostsList
                        data={announces} 
                        title={'Анонсы'}
                        location={location}
                        hasMore={pagination.announces.hasMore}
                        fetchMore={null}
                        scrollFetch={false}
                    />
                :   <Spin />}
            {articles.length 
                ?   <PostsList
                        data={articles} 
                        location={location}
                        fetchMore={getArticles}
                        hasMore={pagination.articles.hasMore}
                    />
                :   null}
        </Fragment>
    )
};


const BlogList = ({
    location, 
    articles,
    pagination, 
    getArticles
}) => {
    return (
        <Fragment>
            {articles.length 
                ?   <PostsList
                        data={articles} 
                        location={location}
                        fetchMore={getArticles}
                        hasMore={pagination.articles.hasMore}
                    />
                :   null}
        </Fragment>
    )
};

const List = ({ staticPage = '', user_id = 0, tags = '' }) => {
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.list.articles);
    const pagination = useSelector((state) => state.list.pagination);
    const dispatch = useDispatch();
    const params = useParams();
    const { id, rubric } = params;
    const isMainPage = useLocation().pathname.length === 1;
    const listInfo = componentParams({ 
        id, 
        rubric, 
        page: staticPage ? staticPage : isMainPage ? 'main' : id 
    });
    const location = isMainPage ? 'main' : (id || '') + (rubric ? `/${rubric}` : '');

    const getAnnounces = (firstRequest = false) => {
        const defaultCount = listInfo.defaultCount;
        const requestCount = firstRequest ? defaultCount : defaultCount + pagination.announces.itemsCount;
        
        dispatch.list.fetchAnnounces({
            params: {
                count: requestCount,
                page_code: listInfo.pageCode,
                type: listInfo.type,
                tags: rubric ? [rubric] : []
            },
            firstRequest
        });
    };

    const getArticles = (firstRequest = false) => {
        const requestCount = firstRequest ? defaultItemsCount : defaultItemsCount + pagination.articles.itemsCount;
        
        dispatch.list.fetchArticles({
            params: listInfo.requestArticlesParams 
                ?   listInfo.requestArticlesParams({
                        count: requestCount,
                        type: listInfo.type,
                        user_id,
                        tags
                    })
                :   {
                        count: requestCount,
                        type: listInfo.type,
                        rubrics: rubric ? [rubric] : [],
                    },
            firstRequest
        });
    };

    useEffect(() => {
        if (listInfo.fetchAnnounces) {
            getAnnounces(true);
        }

        if (listInfo.fetchArticles) {
            getArticles(true);
        }

    }, [dispatch, id, rubric, user_id, tags]);

    return (
        <div className="list_wrap">
            {staticPage 
                ?   <BlogList 
                        announces={announces}
                        articles ={articles}
                        location={location}
                        pagination={pagination}
                        getArticles={getArticles}
                    />
                :   isMainPage 
                    ?   <MainPageList 
                            announces={announces}
                            location={location}
                            pagination={pagination}
                            getAnnounces={getAnnounces}
                        />
                    :   <OnloadList 
                            announces={announces}
                            articles ={articles}
                            location={location}
                            pagination={pagination}
                            getArticles={getArticles}
                        />
            }
        </div>
    )
};

export default List;