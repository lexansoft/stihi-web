import request from 'api';

const newAuthors = {
    state: {
        new: [],
    },
    reducers: {
        addNewAuthors(state, payload) {
            return {
                ...state,
                new: payload
            }
        },
    },
    effects: dispatch => ({
        async fetchNewAuthors(payload) {
            const data = await request.getNewAuthors(payload);
            dispatch.newAuthors.addNewAuthors(data.data.list);
        }
    }),
};

export default newAuthors;