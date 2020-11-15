import React from 'react';
import { useDispatch } from 'react-redux';

const SignIn = () => {
    const dispatch = useDispatch();
    const close = () => dispatch.modal.toggle({ show: false, content: 'none' });
    const singin = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        
        dispatch.auth.login({
            name,
            password
        });
    }
    return (
        <form onSubmit={singin}>
            <div>Войти</div>
            <input name="name" placeholder="login" />
            <input name="password" placeholder="password" />
            <button type="submit">войти</button>
            <button onClick={close}>отмена</button>
        </form>
    )
}

export default SignIn;