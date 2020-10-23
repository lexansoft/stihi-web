import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

const RubricsFilter = () => {
    const rubricsList = useSelector((state) => state.menu.rubricsList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch.menu.fetchRubricsList();
    }, [dispatch]);
    return (
        rubricsList
            ?   <select>
                    <option>Все рубрики</option>
                    {rubricsList.map((el, key) => (
                        <option key={`${el.name}-${key}`}>{el.name}</option>
                    ))}
                </select>
            : null
    )
};

export default RubricsFilter;