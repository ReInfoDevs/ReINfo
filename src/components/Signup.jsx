import React from "react";

const signup = () => {
    return (
        <div className='signup'>
            <div>Signup</div>
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

export default signup;