import React from 'react';
import './filter.scss';

const links = [
    {
        name: 'Авторы',
        link: '/'
    },
    {
        name: 'Новое',
        link: '/'
    },
    {
        name: 'Актуальное',
        link: '/'
    },
    {
        name: 'Лидеры',
        link: '/'
    },
    {
        name: 'Комментарии',
        link: '/'
    },
    {
        name: 'Новости',
        link: '/'
    }
];

const Filter = () => {
    return (
        <div className="filter_wrap">
            {links.map((el, key) => (
                <div className="filter_item" key={`${el.name}-${key}`}>{el.name}</div>
            ))}
        </div>
    )
}

export default Filter;