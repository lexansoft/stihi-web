import request from 'api';

const post = {
    state: {
        content: {},
        list: [],
        next: '',
        prev: '',
        comments: []
    },
    reducers: {
        addCommentList(state, payload) {
            return {
                ...state,
                comments: payload
            }
        },
        addPost(state, payload) {
            return {
                ...state,
                content: payload
            }
        },
        addList(state, payload) {
            let next = '';
            let prev = '';

            payload.forEach((item, index) => {
                if (item.id === state.content.id) {
                    console.log({item, index})
                    next = payload[index + 1] ? payload[index + 1].id : '';
                    prev = payload[index - 1] ? payload[index - 1].id : '';
                }
            });
            return {
                ...state,
                list: payload,
                next,
                prev
            }
        }
    },
    effects: dispatch => ({
        async fetchPostItem(payload) {
            const data = await request.getPostItem(payload);
            dispatch.post.addPost(data.data.content);
        },
        async fetchListItems(payload) {
            const data = await request.getArticlesList(payload);
            dispatch.post.addList(data.data.list);
        },
        async fetchCommentsList(payload) {
            const data = await request.getCommentsList(payload);
            dispatch.post.addCommentList(data.data.list);
        }
    }),
};

export default post;