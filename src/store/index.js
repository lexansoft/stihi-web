import { init } from '@rematch/core'
import list from 'components/list/model';
 
const store = init({
    models: {
        list
    },
})
 
export default store