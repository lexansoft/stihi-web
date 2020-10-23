import React, { Fragment } from 'react';

import { useLocation } from 'react-router-dom';

import List from 'components/list';
import Authors from 'components/authors';
import Post from 'components/post';
import CommentList from 'components/comment-list';

const BaseList = <Fragment>
                    <List />
                    <Authors />
                </Fragment>;

const lists = {
    new: BaseList,
    popular: BaseList,
    actual: BaseList,
    comments: <CommentList />
};

const Posts = () => {
    const location = useLocation();
    const urlList = location.pathname.split('/');
    const category = urlList[urlList ?  urlList.length - 1 : ''];
    
    return lists[category] || <Post />;
};

export default Posts;