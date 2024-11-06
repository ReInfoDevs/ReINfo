import React, {useEffect, useState} from 'react';

const Tech = ({ tech, category, changeTech }) => {

    
    const [techArray, setTechArray] = useState([])
    
    useEffect(() => {
        const fetchTech = async () => {
          try {
            const techFetch = await fetch('/tech', {
                body: JSON.stringify({ techCategory: category})
            });  // Fetch categories from the server
            const response = await techFetch.json(); // Parse the response
            setTechArray(response.tech); // Update state with fetched categories
          } catch (error) {
            console.error('Error fetching Technologies:', error);
          }
        };
    
        fetchTech(); // Call the fetch function when the component mounts
      }, []); // Empty dependency array means it runs only once, when the component mounts

    const handleOnClick = (tech) => {
        changeTech(tech);
    }

    return (
        <div>
      {techArray.length > 0 ? (
        techArray.map((item, index) => (
          <button key={index} onClick={() => handleOnClick(item)}>
            {item} {/* Display category name inside the button */}
          </button>
        ))
      ) : (
        <p>Loading Technologies...</p> // Display a loading message if categories are not yet fetched
      )}
    </div>
    );
}

export default Tech;