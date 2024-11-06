import React from 'react';

const Categories = async ({ tech, category, changeCat }) => {

    
    
    const catFetch = await fetch('/categories');
    const response = await catFetch.json()

    const catArray = response.categories;

    const handleOnClick = (cat) => {
        changeCat(cat);
    }

    return (
        <div>
            <ul>
            {catArray.map((item, index) => ( <button onClick={handleOnClick}key={index}></button>))}  
            </ul>
        </div>
    )
}

export default Categories;