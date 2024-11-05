import React from 'react';
import '../css/styles.css';

const login = () => {
    return (
        <div className='login'>
            <div>Login</div>
            <form>
            <label>
                Username:
                <input type='text' name='username' />
            </label>
            <label>
                Password:
                <input type='password' name='password' />
            </label>
            <input type='submit' name='submit'/>
        </form>
        </div>
        
    )
}

export default login;