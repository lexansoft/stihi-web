import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SignIn from 'components/auth/sign-in';
import CyberWayProfile from 'components/auth/cyberway-profile';
import SignUp from 'components/auth/sign-up';


import './style.scss';

const contentsList = {
    sign_in: <SignIn />,
    cyberway: <CyberWayProfile />,
    sign_up: <SignUp />
}

const Modal = () => {
    const dispatch = useDispatch();
    const isShow = useSelector((state) => state.modal.isShow);
    const content = useSelector((state) => state.modal.content);
    const toggle = () => {
        dispatch.modal.toggle({show: false, content: 'none'});
    };
    return (
        isShow 
        ?   <div className="modal">
                <div onClick={toggle} className="modal_bg"></div>
                <div className="modal-window">
                    <div className="modal-window_content">
                        {contentsList[content]}
                    </div>
                </div>
            </div>
        : null
    )
}

export default Modal;