import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

const Authors = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch.authors.fetchAuthorsInvites({
            count: 8
        });
    }, [dispatch]);
    const authorsInvites = useSelector((state) => state.authors.authorsInvites);
    return (
        <div className="authors_wrap">
            <div className="authors_content">
                <div>Авторы приглашают</div>
                <div>
                    {
                        authorsInvites.map((el, key) => (
                            key < 5 
                            ?   <div className="authors_item" key={el.id}>
                                    <div className="authors_avatar">
                                        <img src={el.author.avatar || 'https://stihi.io/frontend_assets_stihi/img/avatar_default.png'} />
                                    </div>
                                    <div className="authors_nickname">{el.author.nickname || el.author_name}</div>
                                </div>
                            : null
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Authors;