import Cookies from 'js-cookie';

export const getAuthToken = () => Cookies.get('token');
export const getUserId = () => Cookies.get('parsedToken') ? JSON.parse(Cookies.get('parsedToken')).sub : 0;

export default {
    getAuthToken,
    getUserId
}