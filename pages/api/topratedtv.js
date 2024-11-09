export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
      console.log(data);
    } catch {
      res.status(500).json({ error: 'Failed to fetch TV Shows and Series', error });
    }
  }