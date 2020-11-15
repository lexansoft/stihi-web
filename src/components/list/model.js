import request from 'api';

const list = {
    state: {
        announces: [],
        articles: [],
        pagination: {
            announces: {
                itemsCount: 0,
                hasMore: true
            },
            articles: {
                itemsCount: 0,
                hasMore: true
            }
        }
    },
    reducers: {
        addAnnounces(state, payload) {
            const announcesCount = state.pagination.announces.itemsCount;
            const isEnd = (itemsLength) => announcesCount !== itemsLength;
            return {
                ...state,
                announces: payload,
                pagination: {
                    ...state.pagination,
                    announces: {
                        itemsCount: isEnd(payload.length) ? payload.length : announcesCount,
                        hasMore: isEnd(payload.length)
                    }
                }
            }
        },
        addArticles(state, payload) {
            const articlesCount = state.pagination.articles.itemsCount;
            const isEnd = (itemsLength) => articlesCount !== itemsLength;
            return {
                ...state,
                articles: payload,
                pagination: {
                    ...state.pagination,
                    articles: {
                        itemsCount: isEnd(payload.length) ? payload.length : articlesCount,
                        hasMore: isEnd(payload.length)
                    }
                }
            }
        },
    },
    effects: dispatch => ({
        async fetchAnnounces({ params, firstRequest = false }) {
            if (firstRequest) {
                dispatch.list.addAnnounces([]);
                dispatch.list.addArticles([]);
            }
            const data = await request.getAnnouncesList(params);
            dispatch.list.addAnnounces(data.data.list);
        },
        async fetchArticles({ params, firstRequest = false }) {
            if (firstRequest) {
                dispatch.list.addArticles([]);
            }
            const data = await request.getArticlesList(params);
            dispatch.list.addArticles(data.data.list);
        }
    }),
}

export default list;