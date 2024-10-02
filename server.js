require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;  // Load NASA API key from .env

// Enable CORS for cross-origin requests
app.use(cors());

// Route to handle requests to the NASA APOD API
app.get('/apod', async (req, res) => {
  console.log('Request received for /apod');  // Log request to /apod route

  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    console.log('NASA API data successfully fetched:', response.data);  // Log the fetched data
    res.json(response.data);  // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching data from NASA API:', error.message);  // Log errors
    res.status(500).send('Error fetching data from NASA API');
  }
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
