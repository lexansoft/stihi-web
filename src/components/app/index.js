import React from 'react';
import { Router, Route } from "react-router-dom";

import Menu from 'components/menu';
import PostList from 'pages/post-list';
import Post from 'components/post';
import Main from 'pages/main';
import CommentList from 'components/comment-list';
import UserBlog from 'components/user-blog';
import Modal from 'ui/modal';

import './style.scss';

const App = ({history}) => {
    return (
        <Router history={history}>
            <div className="app-grid">
                <Menu />
                <Modal />
                <Route path="/item/:id/:rubric/:postId">
                    <Post />
                </Route>
                <Route exact path="/item/:id/:postId">
                    <Post />
                </Route>
                <Route path="/posts/:id/:rubric">
                    <PostList />
                </Route>
                <Route exact path="/posts/:id">
                    <PostList />
                </Route>
                <Route path="/comments">
                    <CommentList />
                </Route>
                <Route exact path="/@:login">
                    <UserBlog />
                </Route>
                <Route exact path="/">
                    <Main />
                </Route>
            </div>
        </Router>
    )
};

export default App;