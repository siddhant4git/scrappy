import React, { useState, useEffect } from 'react';

const ObjectStringComponent = () => {
  const [objectString, setObjectString] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8081/');
      const data = await response.json();

      // Extract the string values from the object
      const [x1, y1, x2, y2, object_type, probability] = data[0];

      // Create the string representation
      const extractedObjectString = `${x1}, ${y1}, ${x2}, ${y2}, ${object_type}, ${probability}`;

      setObjectString(extractedObjectString);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <p>Object String:</p>
      <p>{objectString}</p>
    </div>
  );
};

export default ObjectStringComponent;
