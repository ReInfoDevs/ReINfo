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
            {techArray.map((item, index) => ( <button onClick={handleOnClick}key={index}></button>))}
        </div>
    )
}

export default Tech;