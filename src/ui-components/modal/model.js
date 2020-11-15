import request from 'api';

const modal = {
    state: {
        isShow: false,
        content: 'none'
    },
    reducers: {
        toggle(state, payload) {
            return {
                ...state,
                isShow: payload.show,
                content: payload.content
            }
        },
    },
    effects: dispatch => ({
        // async fetchAnnounces({ params, firstRequest = false }) {
        //     if (firstRequest) {
        //         dispatch.list.addAnnounces([]);
        //         dispatch.list.addArticles([]);
        //     }
        //     const data = await request.getAnnouncesList(params);
        //     dispatch.list.addAnnounces(data.data.list);
        // }
    }),
}

export default modal;