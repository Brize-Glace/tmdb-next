import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import BetaBadge from "./betaBadge";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQueryMovie] = useState("");
  const [searchQuerySerie, setSearchQuerySerie] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const router = useRouter();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moviesResponse = await fetch("/api/movies");
        const seriesResponse = await fetch("/api/series");
        const moviesData = await moviesResponse.json();
        const seriesData = await seriesResponse.json();
        setMovies(moviesData.results);
        setSeries(seriesData.results);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Load scripts on client side
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/9b6f3a1221.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  const handleSearchChangeMovie = (e) => {
    setSearchQueryMovie(e.target.value);
  };

  const handleSearchChangeSerie = (e) => {
    setSearchQuerySerie(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchType === "movie") {
      router.push(`/?searchmovie=${searchQuery}`);
      fetch(`/api/searchmovie?query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setMovies(data.results))
        .catch((err) => setError("Failed to load movies"));
      document.getElementById("tv-container").style.display = "none";
      document.getElementById("movies-container").style.display = "block";
    } else {
      router.push(`/?searchtv=${searchQuerySerie}`);
      fetch(`/api/searchtv?query=${searchQuerySerie}`)
        .then((res) => res.json())
        .then((data) => setSeries(data.results))
        .catch((err) => setError("Failed to load series"));
      document.getElementById("movies-container").style.display = "none";
      document.getElementById("tv-container").style.display = "block";
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleDisplayPopularMovies = () => {
    document.getElementById("movies-container").style.display = "block";
    document.getElementById("tv-container").style.display = "none";
    document.getElementById("display-popular-tv").style.color = "white";
    document.getElementById("display-popular-tv").style.background = "transparent";
    document.getElementById("display-popular-movies").style.color = "rgb(63, 76, 119)";
    document.getElementById("display-popular-movies").style.background = "white";
  }

  const handleDisplayPopularTV = () =>  {
    document.getElementById("movies-container").style.display = "none";
    document.getElementById("tv-container").style.display = "block";
    document.getElementById("display-popular-tv").style.color = "rgb(63, 76, 119)";
    document.getElementById("display-popular-tv").style.background = "white";
    document.getElementById("display-popular-movies").style.color = "white";
    document.getElementById("display-popular-movies").style.background = "transparent";

  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }
  },[]);
  const content = windowWidth < 640 ? "TMS" : "The Movie Search";

  return (
    <>
      <Head>
        <title>Popular Movies</title>
        <meta name="description" content="A list of popular movies" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      <div className="scroll-smooth">
        <nav>
          <a href="/"><h1 className="ml-7">{content}</h1></a>
          <ul>
            <li id="selected">
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/top-rated-movies">Movies</a>
            </li>
            <li>
              <a href="/top-rated-tv">TV & Series</a>
            </li>
          </ul>
        </nav>

        {error && <p>{error}</p>}
        {loading ? (
          <div id="loader"></div>
        ) : (
          <div>

            <form
              onSubmit={handleSearchSubmit}
              id="search-form"
            >
              <input
                id="search-input"
                className="bg-transparent border-white border-2 rounded-lg"
                type="text"
                placeholder={
                  searchType === "movie"
                    ? "Search for a movie..."
                    : "Search for a TV show..."
                }
                value={searchType === "movie" ? searchQuery : searchQuerySerie}
                onChange={
                  searchType === "movie"
                    ? handleSearchChangeMovie
                    : handleSearchChangeSerie
                }
              />
              <button type="submit">
                <i
                  className="fas fa-magnifying-glass text-xl"
                  id="search-button"
                ></i>
              </button>
              <select
                name="handleSearch"
                id="handle-search"
                onChange={handleSearchTypeChange}
                className="bg-transparent w-20"
              >
                <option value="movie">Movie</option>
                <option value="tv">TV Show/Series</option>
              </select>
            </form>
            <div
              id="buttons-handler"
              className=" mt-8 mb-8 flex items-center justify-center"
            >
              <a id="display-popular-movies"
                className="ml-8 mr-3 text-coolblue bg-white border-solid border-2 border-white p-1 rounded-md cursor-pointer"
                onClick={handleDisplayPopularMovies}
              >
                Popular Movies
              </a>
              <a id="display-popular-tv"
                className="ml-8 text-white border-solid border-2 border-white p-1 rounded-md cursor-pointer"
                onClick={handleDisplayPopularTV}
              >
                Popular Series
              </a>
            </div>
            <div id="movies-container">
              <h2 className="mb-6 text-center">Popular Movies</h2>
              <div id="content-container">
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <a href={`moviedetails?id=${movie.id}`} key={movie.id}>
                      <div id="movie-card">
                        <img
                          id="movie-poster"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                        <p className="pt-3">{movie.title}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p>No movies found</p>
                )}
              </div>
            </div>
            <div className="hidden" id="tv-container">
              <h2 className="mt-10 mb-6 text-center">Popular TV Shows <BetaBadge text="NEW" /></h2>
              <div id="content-container">
                {series.length > 0 ? (
                  series.map((serie) => (
                    <a href={`tvdetails?id=${serie.id}`} key={serie.id}>
                      <div key={serie.id} id="tv-card">
                        <img
                          id="tv-poster"
                          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                          alt={serie.name}
                        />
                        <p className="pt-3">{serie.name}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p>No series found</p>
                )}
              </div>
            </div>
            <footer>
              <p className="p-7 text-gray-300 text-xs">
              This product uses the TMDB API but is not endorsed or certified by TMDB. The site provides movie information and images sourced from The Movie Database (TMDB) API. All posters, cover art, and other images are the property of their respective owners and are used under license. This site is not affiliated with TMDB and complies with the{" "}
                <a
                  className="text-white font-bold"
                  href="https://www.themoviedb.org/api-terms-of-use"
                >
                  TMDB API Terms of Use
                </a>
                . Users are solely responsible for their actions on the site, including but not limited to spamming or misuse of the API. The site cannot be held liable for any technical issues, unavailability, or malfunctions caused by major problems such as server failures or cyberattacks.
              </p>
              <p className="text-center pb-6">
                &copy; The Movie Search - All Rights Reserved
              </p>
              <p className="text-center pb-4">
                Made with ❤️ by <a href="https://github.com/Brize-Glace" target="_blank" className="font-bold">Romain</a>
              </p>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}
