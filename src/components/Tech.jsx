import React from 'react';

const Tech = async ({ tech, category, changeTech }) => {

    
    const techFetch = await fetch('/tech');
    const response = await techFetch.json()

    const techArray = response.tech;

    const handleOnClick = (tech) => {
        changeTech(tech);
    }
    return (
        <div>
            <ul>
            {techArray.map((item, index) => ( <button onClick={handleOnClick}key={index}></button>))}
            </ul>
        </div>
    )
}

export default Tech;