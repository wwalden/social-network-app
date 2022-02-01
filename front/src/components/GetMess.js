import React, { useState, useEffect } from 'react';

const GetMess = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

 
  useEffect(() => {
    fetch("http://localhost:4200/api/mess")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  
  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.content}
        </li>
      ))}
      </ul>
      
    );
  }
}

export default GetMess;






