export default async function handler(req, res) {
  const apiKey = process.env.TMDB_API_KEY; // Récupère la clé API cachée
  const id = req.query.id; // Récupère l'ID du film
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url); // Requête à l'API de TMDB
    const data = await response.json();
    res.status(200).json(data); // Envoie des données JSON au client
    console.log(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' }); // Gestion des erreurs
  }
}