// pages/api/movies.js

export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY; 
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  
    try {
      const response = await fetch(url); 
      const data = await response.json();
      res.status(200).json(data); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies' }); 
    }
  }