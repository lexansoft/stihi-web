import React, { Fragment } from 'react';

import List from 'components/list';
import Authors from 'components/authors';

const PostList = () => {
    return (
        <Fragment>
            <List />
            <Authors />
        </Fragment>
    );
};

export default PostList;