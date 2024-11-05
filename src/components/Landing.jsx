import React from 'react';
import Login from './Login';
import '../css/styles.css';
import book from '../assets/book.png';

const landing = () => {
return (
<div>
<header className='landingheader'>LearnGineer</header>    
<img src={book} alt="logo" />
<div className='landing'>
    <Login></Login>
</div>
</div>
);
}

export default landing;