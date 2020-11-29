import request from 'api';
import Cookies from 'js-cookie';

const auth = {
    state: {
        user: {
            id: 0,
            avatar: '',
            nickname: ''
        },
        token: '', 
        parsedToken: {},
        battory: 0
    },
    reducers: {
        addSession(state, payload) {
            return {
                ...state,
                token: payload.token,
                parsedToken: payload.parsedToken,
                userId: payload.parsedToken.sub
            }
        },
        addUserInfo(state, payload) {
            return {
                ...state,
                user: payload
            }
        },
        addBattory(state, payload) {
            return {
                ...state,
                battory: payload
            }
        },
        clearProfile(state) {
            Cookies.remove('token');
            Cookies.remove('parsedToken');
            return {
                ...state,
                user: {
                    id: 0,
                    avatar: '',
                    nickname: ''
                },
                token: '', 
                parsedToken: {},
                userId: 0,
                battory: 0
            }
        }
    },
    effects: dispatch => ({
        async login(payload, state) {
            const res = await request.postSingin(payload);
            if (res.data.status === 'ok') {
                const token = res.data.token;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const parsedToken = JSON.parse(window.atob(base64));

                Cookies.set('token', token);
                Cookies.set('parsedToken', parsedToken);
                dispatch.auth.addSession({ parsedToken, token });
                dispatch.modal.toggle({ show: false, content: 'none' });
                state.router.push(`/@${payload.name}`);
            } else {
                console.log('error')
            }
        },
        async fetchUserInfo(payload) {
            const res = await request.getUserInfo(payload);
            dispatch.auth.addUserInfo(res.data.user);
        },
        async fetchBattory() {
            const res = await request.getUserBattery();
            dispatch.auth.addBattory(res.data.value);
        },
        logout(payload, state) {
            dispatch.auth.clearProfile();
            state.router.push('/');
        }
    }),
}

export default auth;