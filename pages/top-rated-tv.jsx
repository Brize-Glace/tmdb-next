import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Head from "next/head";
import BetaBadge from "./betaBadge";

export default function topRatedTv() {
  const [topratedtv, setSeries] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tvResponse = await fetch("/api/topratedtv");
        const tvData = await tvResponse.json();
        setSeries(tvData.results);
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

    const changeInputScript = document.createElement("script");
    changeInputScript.src = "./app/utils/changeInput.js";
    document.body.appendChild(changeInputScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(changeInputScript);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/searchtv?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setSeries(data.results))
      .catch((err) => setError("Failed to load movies"));
  };

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
    <div>
      <Head>
        <title>Top Rated Movies</title>
        <meta name="description" content="A list of popular movies" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <nav>
        <a href="/"><h1>{content}</h1></a>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/top-rated-movies">Movies</a>
            </li>
            <li id="selected">
                <a href="/top-rated-tv">TV & Series</a>
            </li>
          </ul>
        </nav>
        {error && <p>{error}</p>}
        {loading ? (
          <div id="loader"></div>
        ) : (
        <div>
        <form onSubmit={handleSearchSubmit} id="search-form">
          <input
            id="search-input"
            className="bg-transparent"
            type="text"
            placeholder="Search for a TV Show or Serie..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i
              className="fas fa-magnifying-glass text-white text-xl"
              id="search-button"
            ></i>
          </button>
        </form>
            <div>
            <h2 className="pl-5">Top Rated TV Shows & Series <BetaBadge text="NEW" /></h2>
          <div id="content-container">
            {topratedtv.map((tv) => (
              <a href={`tvdetails?id=${tv.id}`} key={tv.id}>
              <div key={tv.id} id="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                />
                <p className="pt-3">{tv.name}</p>
              </div>
              </a>
            ))}
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
}