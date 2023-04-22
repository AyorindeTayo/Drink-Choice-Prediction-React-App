import React, { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_TOM_API_KEY;


function DrinkChoiceForm() {
  const [result, setResult] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [price, setPrice] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();

    const input = JSON.stringify({
      temperature: parseInt(temperature),
      price: parseFloat(price)
    });

    axios.post(`https://api.up2tom.com/v3/models/drink-choice?apiKey=${apiKey}`, { input })
      .then(response => setResult(response.data.decision))
      .catch(error => console.error(error));

      
  }

  return (
    <div>
      <h1>Drink Choice Predictor</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="temperature">Temperature:</label>
          <input type="number" id="temperature" value={temperature} onChange={event => setTemperature(event.target.value)} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" step="0.01" id="price" value={price} onChange={event => setPrice(event.target.value)} />
        </div>
        <button type="submit">Predict</button>
      </form>
      {result && <p>The predicted drink choice is: {result}</p>}
    </div>
  );
}

export default DrinkChoiceForm;
