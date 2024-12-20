export default async function handler(req, res) {
    const { id } = req.query; 
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("---------------------------------------")
      console.log(data)
      console.log("---------------------------------------")
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching similar TV shows:', error);
      res.status(500).json({ error: 'Failed to fetch similar TV shows' });
    }
  }