const express = require('express');
const cors = require('cors'); // Import CORS
const axios = require('axios');
require('dotenv').config(); // Import dotenv to use environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY; // Use environment variable for API key

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Log when the server starts
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the NASA API Backend! Use /apod to fetch APOD data.');
});

// Route to fetch APOD data
app.get('/apod', async (req, res) => {
    console.log('Received request for /apod'); // Log the request
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        console.log('APOD Data:', response.data); // Log the received data
        res.json(response.data); // Send the data back to the client
    } catch (error) {
        console.error('Error fetching data from NASA API:', error.message); // Log error message
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});
