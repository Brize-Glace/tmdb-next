export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const id = req.query.id; 
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
      console.log(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movie' });
    }
}