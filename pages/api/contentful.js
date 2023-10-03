// pages/api/contentful.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const spaceId = process.env.SPACE_ID
    const apiKey = process.env.ACCESS_TOKEN

    // Contentful API endpoint for retrieving entries
    const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/entries`;

    // Set up the headers with the API key
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    // Make the GET request to Contentful
    const response = await axios.get(apiUrl, { headers });

    // Send the response from Contentful back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data from Contentful:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
