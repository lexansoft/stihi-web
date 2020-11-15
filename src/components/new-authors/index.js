import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

const defaultParams = {
    count: 4,
    type: 'new'
};

const NewAuthors = () => {
    const dispatch = useDispatch();
    const newAuthors = useSelector((state) => state.newAuthors.new);
    useEffect(() => {
        dispatch.newAuthors.fetchNewAuthors({
            count: defaultParams.count,
            type: defaultParams.type
        });
    }, [dispatch]);


    console.log(newAuthors)
    return (
        <div className="new-authors">
            <div className="new-authors_content">
                <div>Новые Авторы</div>
                <div className="new-authors_item">
                    {newAuthors.map((el) => (
                        <div className="new-authors_nickname" key={el.id}>
                            <img className="new-authors_avatar" src={el.avatar || 'static/images/avatar_default.png'} />
                            <div className>{el.nickname || el.author_name || el.names.gls}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewAuthors;