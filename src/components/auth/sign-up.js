import React from 'react';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const dispatch = useDispatch();
    const close = () => dispatch.modal.toggle({ show: false, content: 'none' });
    return (
        <div>
            Регистрация
        </div>
    )
}

export default SignUp;