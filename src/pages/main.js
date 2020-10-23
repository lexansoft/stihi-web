import React, { Fragment } from 'react';

import List from 'components/list';
import Authors from 'components/authors';
import LiderWeek from 'components/lider-week';

const Main = () => (
    <Fragment>
        <List />
        <div>
            <LiderWeek />
            <Authors />
        </div>
    </Fragment>
);

export default Main;