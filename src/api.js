import axios from 'axios';
import { getAuthToken } from 'utils';

const api = axios.create({
    baseURL: 'https://stihi.io/api/v2',
    headers: {
        Authorization: "BEARER " + getAuthToken()
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
    getNewAuthors
};

// PA0HV3WlQXsh4DVK1JAmZf7pXYbUTxpCaFmXWsNoMU882ygwjrBB