import request from 'api';

const authors = {
    state: {
        authorsInvites: [],
    },
    reducers: {
        addAuthorsInvites(state, payload) {
            return {
                ...state,
                authorsInvites: payload
            }
        },
    },
    effects: dispatch => ({
        async fetchAuthorsInvites(payload, state) {
            const data = await request.getAuthorsInvites(payload);
            dispatch.authors.addAuthorsInvites(data.data.list);
        }
    }),
};

export default authors;