import axios from 'axios';
import { getAuthToken } from 'utils';

const api = axios.create({
    baseURL: 'https://stihi.io/api/v2',
    headers: {
        Authorization: "BEARER " + getAuthToken()
    }
});

const apiV1 = axios.create({
    baseURL: 'https://stihi.io/api/v1',
    headers: {
        Authorization: "BEARER " + getAuthToken(),
        'Access-Control-Allow-Origin': '*',
    }
});

const getAnnouncesList = (params = {}) => api.post('/get_announces_list', params);

const getArticlesList = (params = {}) => api.post('/get_articles_list', params);

const getAuthorsInvites = (params = {}) => api.post('/get_invites_list', params);

const getRubricsList = (params = {}) => api.post('/get_rubrics_list', params);

const getPostItem = (params = {}) => api.post('/get_article', params);

const getCommentsList = (params = {}) => api.post('/get_comments_list', params);

const postSingin = (params = {}) => api.post('/login', params);

const getUserInfo = (params = {}) => api.post('/get_user_info', params);

const getUserBattery = (params = {}) => api.post('/get_user_battery', params);

const getNewAuthors = (params = {}) => api.post('/get_users_list', params);

const getTagList = (params = {}) => api.post('/get_user_tags_list', params);

const getUserSubscriptionsList = (params = {}) => api.post('/get_user_subscriptions_list', params);

const getUserSubscribersList = (params = {}) => api.post('/get_user_subscribers_list', params);

const subscribeUser = (params = {}) => api.post('/user_subscribe', params);

const getCommentsListAll = (params = {}) => api.post('/get_all_comments_list', params);


export default {
    getPostItem,
    getRubricsList,
    getAnnouncesList,
    getArticlesList,
    getAuthorsInvites,
    getCommentsList,
    postSingin,
    getUserInfo,
    getUserBattery,
    getNewAuthors,
    getTagList,
    getUserSubscriptionsList,
    getUserSubscribersList,
    subscribeUser,
    getCommentsListAll
};

// PA0HV3WlQXsh4DVK1JAmZf7pXYbUTxpCaFmXWsNoMU882ygwjrBB