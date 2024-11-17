import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Head from "next/head";
import BetaBadge from "./betaBadge";

export default function doc() {
  const [windowWidth, setWindowWidth] = useState(0);

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
        <title>Doc</title>
        <meta name="description" content="A list of popular movies" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="..//favicon.ico" />
      </Head>

    <>
    <nav>
            <a href="/"><h1>{content}</h1></a>
            <ul>
              <li>
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
    <h1 className="text-3xl text-center pt-7 font-bold">Documentation</h1>
    <h2 className="text-2xl font-normal pt-3 pl-5">Navigation</h2>
    <p className="pl-5">The navigation bar is located at the top of the page. It contains the following links:</p>
    <ul className="pl-5">
        <li>Home</li>
        <li>Movies</li>
        <li>TV & Series</li>
    </ul>
    <h2 className="text-2xl font-normal pt-3 pl-5">Search</h2>
    <p className="pl-5">The search bar is located at the top of the page. It allows you to search for movies and TV shows by title.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Popular Movies</h2>
    <p className="pl-5">The popular movies section displays a list of popular movies. Click on the "Movies" link in the navigation bar to view this section.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Popular TV Shows</h2>
    <p className="pl-5">The popular TV shows section displays a list of popular TV shows. Click on the "TV & Series" link in the navigation bar to view this section.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Top Rated Movies</h2>
    <p className="pl-5">The top rated movies section displays a list of top rated movies. Click on the "Movies" link in the navigation bar to view this section.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Top Rated TV Shows</h2>
    <p className="pl-5">The top rated TV shows section displays a list of top rated TV shows. Click on the "TV & Series" link in the navigation bar to view this section.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Movie Details</h2>
    <p className="pl-5">Click on a movie poster to view more details about the movie.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">TV Show Details</h2>
    <p className="pl-5">Click on a TV show poster to view more details about the TV show.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Search Results</h2>
    <p className="pl-5">The search results page displays a list of movies and TV shows that match your search query.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">404 Page</h2>
    <p className="pl-5">The 404 page is displayed when a page is not found.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Error Handling</h2>
    <p className="pl-5">Error messages are displayed when an error occurs.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Loading Indicator</h2>
    <p className="pl-5">A loading indicator is displayed when data is being fetched.</p>
    <h2 className="text-2xl font-normal pt-3 pl-5">Badges</h2>
    <p className="pl-5">Badges are displayed on the top right corner of the page to indicate the beta status of a feature of the website.</p>
    <h3 className="text-xl font-normal pl-7 pt-3">Beta</h3>
    <p className="pl-9">This feature is in beta testing and is not fully implemented</p>
    <h3 className="text-xl font-normal pl-7 pt-3">New</h3>
    <p className="pl-9">This feature is new and has been tested an dis now fullt implemented and functionnal.
    </p>
    </>
    </div>
)
}