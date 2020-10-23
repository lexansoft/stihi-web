import axios from 'axios';
import Post from './components/post';

const api = axios.create({
    baseURL: 'https://stihi.io/api/v2',
});

const getAnnouncesList = (params = {}) => {
    return api.post('/get_announces_list', params);
};

const getArticlesList = (params = {}) => {
    return api.post('/get_articles_list', params);
};

const getAuthorsInvites = (params = {}) => {
    return api.post('/get_invites_list', params);
};

const getRubricsList = (params = {}) => {
    return api.post('/get_rubrics_list', params);
};

const getPostItem = (params = {}) => {
    return api.post('/get_article', params);
}
export default {
    getPostItem,
    getRubricsList,
    getAnnouncesList,
    getArticlesList,
    getAuthorsInvites
};