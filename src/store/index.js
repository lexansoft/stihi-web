import { init } from '@rematch/core';

import list from 'components/list/model';
import authors from 'components/authors/model';
import menu from 'components/menu/model';
import post from 'components/post/model';
 
const store = init({
    models: {
        list,
        authors,
        menu,
        post
    },
})
 
export default store