import React from 'react';
import { useDispatch } from 'react-redux';

const CyberWayProfile = () => {
    const dispatch = useDispatch();
    const set = (content) => dispatch.modal.toggle({ show: true, content });
    return (
        <div>
            <div>У вас есть аккаунт на CyberWay?</div>
            <button onClick={() => set('sign_in')}>да</button>
            <button onClick={() => set('sign_up')}>нет</button>
        </div>
    )
}

export default CyberWayProfile;