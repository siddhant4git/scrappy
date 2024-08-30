import React, { useState, useEffect } from 'react';
import "../../CSS/scanner.css";

const Scanner = () => {
  const [boxes, setBoxes] = useState([]);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    setError('');
    const file = event.target.files[0];

    if (file.type !== 'image/jpeg') {
      setError('Please upload a JPEG image.');
      return;
    }

    const data = new FormData();
    data.append('image_file', file);

    const response = await fetch('http://localhost:4000/detect', {
      method: 'POST',
      body: data,
    });

    const boxesData = await response.json();
    setBoxes(boxesData);
    console.log(boxesData);

    const elements = ["Glass", "Metal", "Paper", "Plastic", "Battery", "Biological", "Trash"];
    const elementPoints = [10, 20, 5, 15, 25, 8, 12];

    let totalPoints = points; 
    const index = elements.indexOf(boxesData[0]);
    if (index !== -1) {
      totalPoints += elementPoints[index];
    }
    setPoints(totalPoints);
    console.log(points);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1800);
    
    setError('');
  };

  useEffect(() => {
    async function pointsUpdate() {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:1337/api/points', {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: points }),
        });
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
    pointsUpdate();
  }, [points]);

  return (
    <div>
      <div className="button-borders mt-3">
        <label htmlFor="fileInput" className="primary-button">
          UPLOAD POINTS: {points}
          <input id="fileInput" type="file" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>
      {error && <div className="error-message text-white">{error}</div>} 
      <div>
        <div className="button-borders mt-7">
          <button className="primary-button">
            {boxes.map((box, index) => (
              <li className="points" key={index}>{box}</li>
            ))}
          </button>
        </div>
        <ul>
        </ul>
      </div>
    </div>
  );
}

export default Scanner;
