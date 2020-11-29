import request from 'api';

const userBlog = {
    state: {
        blog: {
            nickname: '',
            name: '',
            web_site: '',
            biography: '',
            avatar: ''
        },
        rubrics: [],
        subscribers: [],
        subscriptions: []
    },
    reducers: {
        addBlogInfo(state, payload) {
            return {
                ...state,
                blog: payload,
                blogId: payload.id
            }
        },
        addBlogTags(state, payload) {
            return {
                ...state,
                rubrics: payload
            }
        },
        addSubscriptions(state, payload) {
            return {
                ...state,
                subscriptions: payload
            }
        },
        addSubscribersList(state, payload) {
            return {
                ...state,
                subscribers: payload
            }
        }
    },
    effects: dispatch => ({
        async fetchBlogInfo(payload) {
            const data = await request.getUserInfo(payload);
            await dispatch.userBlog.addBlogInfo(data.data.user);
        },
        async fetchBlogTags(payload) {
            const data = await request.getTagList(payload);
            await dispatch.userBlog.addBlogTags(data.data.list);
        },
        async fetchSubscriptionsList(payload) {
            const data = await request.getUserSubscriptionsList(payload);
            await dispatch.userBlog.addSubscriptions(data.data.list);
        },
        async fetchSubscribersList(payload) {
            const data = await request.getUserSubscribersList(payload);
            await dispatch.userBlog.addSubscribersList(data.data.list);
        },
        async postSubscribeUser(payload) {
            const data = await request.subscribeUser(payload);
        }
    }),
};

export default userBlog;