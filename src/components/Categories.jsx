import React, {useState, useEffect} from 'react';

const Categories = ({ changeCat }) => {

    const [catArray, setCatArray] = useState([])
    
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const catFetch = await fetch('/categories');  // Fetch categories from the server
            const response = await catFetch.json(); // Parse the response
            setCatArray(response.categories); // Update state with fetched categories
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories(); // Call the fetch function when the component mounts
      }, []); // Empty dependency array means it runs only once, when the component mounts

    const handleOnClick = (cat) => {
        changeCat(cat);
    }

    return (
        <div>
      {catArray.length > 0 ? (
        catArray.map((item, index) => (
          <button key={index} onClick={() => handleOnClick(item)}>
            {item} {/* Display category name inside the button */}
          </button>
        ))
      ) : (
        <p>Loading categories...</p> // Display a loading message if categories are not yet fetched
      )}
    </div>
    );
}

export default Categories;