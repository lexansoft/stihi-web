import request from 'api';

const menu = {
    state: {
        rubricsList: [],
    },
    reducers: {
        addRubricsList(state, payload) {
            return {
                ...state,
                rubricsList: payload
            }
        },
    },
    effects: dispatch => ({
        async fetchRubricsList(payload, state) {
            const data = await request.getRubricsList(payload);
            dispatch.menu.addRubricsList(data.data.list);
        }
    }),
};

export default menu;