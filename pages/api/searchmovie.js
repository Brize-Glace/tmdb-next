// pages/api/search.js
export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY; 
    const query = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
  
    try {
      const response = await fetch(url); 
      const data = await response.json();
      res.status(200).json(data); 
      console.log(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies' }); 
    }
  }