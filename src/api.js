import axios from 'axios';

const api = axios.create({
    baseURL: 'https://stihi.io/api/v2',
});

const getAnnouncesList = (params = {}) => {
    return api.post('/get_announces_list', params);
};

const getArticlesList = (params = {}) => {
    return api.post('/get_articles_list', params);
}

export default {
    getAnnouncesList,
    getArticlesList
};