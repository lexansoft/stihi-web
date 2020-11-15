import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spin from 'ui/spin';

const PostItem = ({ el, location }) => (
    <div className="list_box_item" key={el.id}>
        <Link to={`/item/${location}/${el.id}`} className="list_box_item-image">
            <img src={el.image} alt="image" />
        </Link>
        <div className="list_box_item-text">
            <Link to={`/item/${location}/${el.id}`} className="list_box_item-title">{el.title}</Link>
            <Link to={`/item/${location}/${el.id}`} className="list_box_item-descrition">{el.body}</Link>
            <div className="list_box_info">
                <div>{el.user.nickname}</div>
                <div>{moment(el.time).format('DD/MM/YYYY, HH:mm')}</div>
                <div>Нравится {el.votes_count}</div>
            </div>
        </div>
    </div>
);

const PostsList = ({ 
    data, 
    title = '', 
    location, 
    fetch = null, 
    isList = true,
    hasMore
}) => {
    const list = data.map((el) => (
        <PostItem 
            key={el.id}
            el={el}
            location={location}
        />
    ));

    return (
        <div className="list_box">
            <div className="list_box_content">
                {title ? <div className="list_box_title">{title}</div> : null}
                {
                    isList 
                        ?   <InfiniteScroll
                                dataLength={data.length}
                                next={fetch}
                                hasMore={hasMore}
                                loader={<Spin />}
                            >
                               {list} 
                            </InfiniteScroll>
                        :   list
                }       
            </div>
        </div>
    )
};

export default PostsList;