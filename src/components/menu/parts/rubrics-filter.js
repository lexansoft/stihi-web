import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";

import './rubrics-filter.scss';

const RubricsFilter = () => {
    const rubricsList = useSelector((state) => state.menu.rubricsList);
    const location = useLocation().pathname.split('/');
    const updateLocation = location.length > 3 ? location.filter((item, index) => index < 3).join('/') : location.join('/');
    let history = useHistory();
    const change = (e) => {
        const rubric = e.target.value;
        const url = rubric ? `${updateLocation}/${rubric}` : updateLocation;
        history.push(url);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch.menu.fetchRubricsList();
    }, [dispatch]);
    
    return (
        rubricsList
            ?   <select onChange={change} className="rubrics-filter">
                    <option value="">Все рубрики</option>
                    {rubricsList.map((el, key) => (
                        <option key={`${el.name}-${key}`} value={el.name}>{el.name}</option>
                    ))}
                </select>
            : null
    )
};

export default RubricsFilter;