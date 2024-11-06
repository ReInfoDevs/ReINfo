import React from 'react';
import { useState, useEffect } from 'react'
import Categories from './Categories';
import Tech from './Tech';
import Resources from './Resources';

//const [Resources, setCategory] = useState('');
const Home = () => {
const [category, setCategory] = useState('');
console.log(category);
const [tech, setTech] = useState('');
console.log(tech);

const changeCat = (category) => {
    setCategory(category);
}

const changeTech = (category) => {
    setTech(category);
}





    if(category === '' && tech === ''){
        return (
            <div>
                <Categories tech={tech} category={category} changeCat={changeCat}/>
            </div>
        )
    };

    if(category !== '' && tech === ''){
        return (
            <div>
                <Tech tech={tech} category={category} changeTech={changeTech}/>
            </div>
        )
    };

    if(category !== '' && tech !== ''){
        return (
            <div>
                <Resources tech={tech} category={category}/>
            </div>
        )
    };


    
}

export default Home;