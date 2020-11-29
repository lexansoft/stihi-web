import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostsList from 'components/list/parts/posts-list';
import { parseMarkdown } from "utils";

import InfiniteScroll from 'react-infinite-scroll-component';
import Spin from 'ui/spin';

import './style.scss';

const CommentItem = ({el, articles}) => (
    <div className="comments-list_item">
        <div className="comments-list_item_content">
            {articles ? <div className="comments-list_item_title">Комментарий на {articles[el.parent_id].title} ({articles[el.parent_id].user.names.gls})</div> : null}
            <div className="comments-list_item_card">
                <div className="comments-list_item_avatar">
                    <img className src={el.user.avatar || 'static/images/avatar_default.png'} />
                </div>
                <div className="comments-list_item_name">
                    <div>{el.user.names.gls}</div>
                    <div dangerouslySetInnerHTML={parseMarkdown(el.body)} />
                </div>
            </div>
            {el.comments && el.comments.map((item) => (
                <div key={item.id} className="comments-list_item_card">
                    <div className="comments-list_item_avatar">
                        <img className src={item.user.avatar || 'static/images/avatar_default.png'} />
                    </div>
                    <div className="comments-list_item_name">
                        <div>{item.user.names.gls}</div>
                        <div dangerouslySetInnerHTML={parseMarkdown(item.body)} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const defaultCounts = 20; 

const CommentList = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.list);
    const announces = useSelector((state) => state.list.announces);
    const articles = useSelector((state) => state.comments.articles);
    const pagination = useSelector((state) => state.comments.pagination);
    const getAnnounces = (firstRequest = false) => {
        dispatch.list.fetchAnnounces({
            params: {
                count: 3,
                page_code: 'comments',
                type: 'comments',
            },
            firstRequest
        });
    };
    const updateComments = () => {
        dispatch.comments.fetchComentsListAll({
            full: true,
            count: pagination.comments.itemsCount + defaultCounts
        });
    }
    useEffect(() => {
        getAnnounces();
        updateComments();
    }, [comments]);

    const list = comments.map((el) => (
        <CommentItem 
            articles={articles}
            el={el}
            key={el.id}
        />
    ));

    return (
        <div className="comments-list">
            <PostsList
                data={announces} 
                title={'Анонсы'}
                location={'location'}
                hasMore={null}
                fetchMore={null}
                scrollFetch={false}
            />
            <div className="comments-list_content">
                <InfiniteScroll
                    dataLength={comments.length}
                    next={updateComments}
                    hasMore={pagination.hasMore}
                    loader={<Spin />}
                >
                    {list}
                </InfiniteScroll>   
            </div>
        </div>
    )
};

export default CommentList;