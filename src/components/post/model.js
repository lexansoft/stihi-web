import request from 'api';

const post = {
    state: {
        content: {},
    },
    reducers: {
        addPost(state, payload) {
            return {
                ...state,
                content: payload
            }
        },
    },
    effects: dispatch => ({
        async fetchPostItem(payload) {
            const data = await request.getPostItem(payload);
            dispatch.post.addPost(data.data.content);
        }
    }),
};

export default post;