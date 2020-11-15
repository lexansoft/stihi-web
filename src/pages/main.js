import React, { Fragment } from 'react';

import List from 'components/list';
import Authors from 'components/authors';
import LiderWeek from 'components/lider-week';
import NewAuthors from 'components/new-authors';

const Main = () => (
    <Fragment>
        <List />
        <div>
            <LiderWeek />
            <Authors />
            <NewAuthors />
        </div>
    </Fragment>
);

export default Main;