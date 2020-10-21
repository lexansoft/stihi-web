import request from 'api';

const list = {
    state: {
        announces: [],
        articles: []
    },
    reducers: {
        // handle state changes with pure functions
        addAnnounces(state, payload) {
            return {
                ...state,
                announces: payload
            }
        },
        addArticles(state, payload) {
            return {
                ...state,
                articles: payload
            }
        },
    },
    effects: dispatch => ({
        async fetchAnnounces(payload, state) {
            const data = await request.getAnnouncesList(payload);
            dispatch.list.addAnnounces(data.data.list);
        },
        async fetchArticles(payload, state) {
            const data = await request.getArticlesList(payload);
            dispatch.list.addArticles(data.data.list);
        }
    }),
}

export default list;