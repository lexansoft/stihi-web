import React from 'react';
import { Link } from "react-router-dom";

import RubricsFilter from './rubrics-filter';

import { useLocation } from 'react-router-dom';

import './filter.scss';

const showFilter = {
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
        link: '/posts/comments'
    }
];

const Filter = () => {
    const location = useLocation();
    const urlList = location.pathname.split('/');
    const category = urlList[urlList ?  urlList.length - 1 : ''];
    return (
        <div className="filter_wrap">
            <div className="filter_content">
                {links.map((el, key) => (
                    <Link key={`${el.name}-${key}`} to={el.link}><div className="filter_item">{el.name}</div></Link>
                ))}
                {showFilter[category] ? <RubricsFilter /> : null}
            </div>
        </div>
    )
}

export default Filter;