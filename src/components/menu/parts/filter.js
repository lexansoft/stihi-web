import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import RubricsFilter from './rubrics-filter';

import classNames from 'classnames/bind';
import './filter.scss';

const urlsFilter = {
    new: 'new',
    popular: 'popular',
    actual: 'actual'
};

const links = [
    {
        name: 'Новое',
        link: '/posts/new'
    },
    {
        name: 'Актуальное',
        link: '/posts/actual'
    },
    {
        name: 'Лидеры',
        link: '/posts/popular'
    },
    {
        name: 'Комментарии',
        link: '/comments'
    }
];

const Filter = () => {
    const location = useLocation();
    const isMainPage = location.pathname.length === 1;
    const urlList = location.pathname.split('/');
    const showFilter = urlList.find((el) => el === urlsFilter[el]);
    const activePage = (link) => isMainPage ? false : link.indexOf(location.pathname) !== -1;

    return (
        <div className="filter_wrap">
            <div className="filter_content">
                {links.map((el, key) => (
                    <Link className={classNames(activePage(el.link) ? "filter_item_active" : "")} key={`${el.name}-${key}`} to={el.link}>
                        <div className="filter_item"><div className="filter_item_title">{el.name}</div></div>
                    </Link>
                ))}
                {showFilter ? <RubricsFilter /> : null}
            </div>
        </div>
    )
}

export default Filter;