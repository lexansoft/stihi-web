import request from 'api';

const comments = {
    state: {
        list: [],
        articles: null,
        pagination: {
            comments: {
                itemsCount: 0,
                hasMore: true
            }
        }
    },
    reducers: {
        addComments(state, payload) {
            const itemsCount = state.pagination.comments.itemsCount;
            const isEnd = (itemsLength) => itemsCount !== itemsLength;
            return {
                ...state,
                list: payload.list,
                articles: payload.articles,
                pagination: {
                    comments: {
                        itemsCount: isEnd(payload.list.length) ? payload.list.length : itemsCount,
                        hasMore: isEnd(payload.list.length)
                    }
                }
            }
        }
    },
    effects: dispatch => ({
        async fetchComentsListAll(payload) {
            const res = await request.getCommentsListAll(payload);
            dispatch.comments.addComments(res.data);
        },
        async fetchComentsList() {
            const res = await request.getUserBattery();
            dispatch.comments.addComments(res.data.value);
        }
    }),
}

export default comments;