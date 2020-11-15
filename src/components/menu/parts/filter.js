import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RubricsFilter from './rubrics-filter';

import classNames from 'classnames/bind';
import './filter.scss';

const urlsFilter = {
    new:  'new',
    popular: 'popular',
    actual: 'actual'
};

const authLinks = [
    {
        name: 'Лента',
        link: '/posts/follow',
        tag: 'follow'
    }
];

const links = [
    {
        name: 'Лидеры',
        link: '/posts/popular',
        tag: 'popular'
    },
    {
        name: 'Актуальное',
        link: '/posts/actual',
        tag: 'actual'
    },
    {
        name: 'Комментарии',
        link: '/comments',
        tag: 'comments'
    },
    {
        name: 'Новое',
        link: '/posts/new',
        tag: 'new'
    }
];

const Filter = () => {
    const isAuth = useSelector((state) => state.auth);
    console.log(isAuth);
    const newLinks = isAuth ? links.concat(authLinks) : links;
    const location = useLocation();
    const isMainPage = location.pathname.length === 1;
    const urlList = location.pathname.split('/');
    const activePage = (tag) => isMainPage ? false : location.pathname.indexOf(tag) !== -1;
    const showFilter = () => {
        let isPost = false;
        let isFilterUrl = false;
        
        urlList.forEach((el) => {
            if (el === 'item') {
                isPost = true;
            }
            if (el === urlsFilter[el]) {
                isFilterUrl = true;
            }
        });

        return isFilterUrl && !isPost
    };

    return (
        <div className="filter_wrap">
            <div className="filter_content">
                {newLinks.map((el, key) => (
                    <Link className={classNames(activePage(el.tag) ? "filter_item_active" : 0)} key={`${el.name}-${key}`} to={el.link}>
                        <div className="filter_item"><div className="filter_item_title">{el.name}</div></div>
                    </Link>
                ))}
                {showFilter() ? <RubricsFilter /> : null}
            </div>
        </div>
    )
}

export default Filter;