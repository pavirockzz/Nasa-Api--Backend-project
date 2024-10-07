const express = require('express');
const cors = require('cors'); // Import CORS
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = 'YSE9eSsZounDbXTfedkdc5Rq8eO9KSkSfKgAZafz'; // Replace with your actual API key

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Log when the server starts
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
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
