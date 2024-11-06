import React from 'react';
import Login from './Login';
import '../css/styles.css';
import book from '../assets/book.png';


const Landing = () => {
return (
    <div id="landingContainer">
        <header className='landingheader'>LearnGineer</header>
        <div className='center'>
            <p>Everything you need in one place: resources for all your tech needs.</p>    
            <div className='landing'>
                <Login></Login>
            </div>
        </div>
    </div>
);
}

export default Landing;