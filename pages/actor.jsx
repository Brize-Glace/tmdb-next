import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Head from "next/head";

export default function Actor() {
  const [actor, setActor] = useState(null);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`api/actor?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActor(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
    <div className="relative w-screen h-screen m-0 p-0">
      <Head>
        <title>{actor ? actor.name : "Loading..."}</title>
        <meta name="description" content="Description of actor" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      {loading ? (
        <div id="loader"></div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="pb-12">
          <nav>
            <a href="/">
              <h1 className="ml-7">{content}</h1>
            </a>
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
          <h1 className="text-4xl font-bold text-center mt-8">{actor.name}</h1>
          <div className="flex flex-col mt-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="rounded-3xl w-64 items-center justify-center mx-auto"
            />
            <h2 className="text-3xl font-bold mt-4 mx-24">Biography</h2>
            <p className="text-lg mt-4 px-32">{ actor.biography === "" ? "No biography" : actor.biography}</p>
            <h2 className="text-3xl font-bold mt-4 mx-24">Others infos</h2>
            <p className="text-lg mt-4 px-32"> Born {formatDate(actor.birthday)} in {actor.place_of_birth}</p>
          </div>
        </div>
      )}
    </div>
  );
}
