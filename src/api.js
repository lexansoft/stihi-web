import axios from 'axios';
import Post from './components/post';

const api = axios.create({
    baseURL: 'https://stihi.io/api/v2',
});

const getAnnouncesList = (params = {}) => api.post('/get_announces_list', params);

const getArticlesList = (params = {}) => api.post('/get_articles_list', params);

const getAuthorsInvites = (params = {}) => api.post('/get_invites_list', params);

const getRubricsList = (params = {}) => api.post('/get_rubrics_list', params);

const getPostItem = (params = {}) => api.post('/get_article', params);

const getCommentsList = (params = {}) => api.post('/get_comments_list', params);

export default {
    getPostItem,
    getRubricsList,
    getAnnouncesList,
    getArticlesList,
    getAuthorsInvites,
    getCommentsList
};