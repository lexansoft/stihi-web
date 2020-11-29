import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const BlogNavigation = ({ id }) => {
    const subscriptions = useSelector((state) => state.userBlog.subscriptions);
    const subscribers = useSelector((state) => state.userBlog.subscribers);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch.userBlog.fetchBlogTags({ id });
            dispatch.userBlog.fetchSubscriptionsList({ user_id: id });
            dispatch.userBlog.fetchSubscribersList({ user_id: id })
        }
    }, [id]);

    return (
        <div className="blog-navigation">
            <div className="blog-navigation_content">
                <div className="blog-navigation_item">Блог</div>
                <div className="blog-navigation_item">Подписки {subscriptions.length}</div>
                <div className="blog-navigation_item">Подписчики {subscribers.length}</div>
                <div className="blog-navigation_item">Комментарии</div>
                <div className="blog-navigation_item">Кошелек</div>
            </div>
        </div>
    )
}

export default BlogNavigation;