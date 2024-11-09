import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import BetaBadge from "./betaBadge";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Ensure id is defined before making the API call
      setLoading(true);
      try {
        const response = await fetch(`/api/moviedetails?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);

        const similarResponse = await fetch(`/api/similarmovies?id=${id}`);
        if (!similarResponse.ok) {
          throw new Error(`HTTP error! status: ${similarResponse.status}`);
        }
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results);

        const creditsResponse = await fetch(`/api/moviecredits?id=${id}`);
        if (!creditsResponse.ok) {
          throw new Error(`HTTP error! status: ${creditsResponse.status}`);
        }
        const creditsData = await creditsResponse.json();
        setMovieCredits(creditsData.cast);
      } catch (error) {
        setError("Failed to fetch movie");
        router.push("/500");
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
  return (
    <div className="relative w-screen h-screen overflow-x-hidden m-0 p-0">
      <Head>
        <title>{movie.title || "Movie Details"}</title>
        <meta name="description" content="A list of popular movies" />
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
        <p>{error}</p>
      ) : (
        <>
          <nav>
            <h1>The Movie Search</h1>
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
              <li></li>
            </ul>
          </nav>
          <div id="body">
            <div id="headerDetails">
              <div className="relative w-screen h-[50vh] overflow-hidden m-0 p-0 flex">
                {movie.backdrop_path === null ? (
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-[.3]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                    alt={movie.title}
                  />
                ) : (
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-[.3]"
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                )}
                {movie.poster_path === null ? (
                  <img
                    className="relative top-4 left-2 h-[350px] w-[230px] object-cover z-10 rounded-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                    alt={movie.title}
                  />
                ) : (
                  <img
                    className="relative top-4 left-2 h-[350px] w-auto object-cover z-10 rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <div className="relative z-10 pt-9 ml-4 max-w-3xl">
                  <h1 className="text-4xl font-bold">{movie.title}</h1>
                  <p className="pt-3 text-gray-300 italic">{movie.tagline === "" ? "No tagline found" : movie.tagline}</p>
                  {movie.release_date === "" ? (
                    <p className="pt-3 pb-3">No release date yet</p>
                  ) : (
                    <p className="pt-3 pb-3">
                      {formatDate(movie.release_date)}
                    </p>
                  )}
                  {movie.status === "Released" ? (
                    <p className="bg-green-600 bg-opacity-25 max-w-24 h-[30px] border border-green-400 rounded-md flex items-center justify-center">
                      {movie.status}
                    </p>
                  ) : (
                    <p className="bg-red-600 bg-opacity-25 max-w-32 h-[30px] border border-red-400 rounded-md flex items-center justify-center">
                      {movie.status}
                    </p>
                  )}
                  {movie.vote_count === 0 ? (
                    <p className="pt-3">No ratings yet</p>
                  ) : (
                    <p className="pt-3">
                      {movie.vote_average} (of {movie.vote_count} votes)
                    </p>
                  )}
                  <p className="pt-3">
                    Genres:{" "}
                    {movie.genres &&
                      movie.genres.map((genre) => genre.name).join(" | ")}
                  </p>
                </div>
              </div>
            </div>
            <div id="infos">
              <div id="plot-container">
                <h2 className="pt-9 pl-5">
                  Plot <BetaBadge />
                </h2>
                <p className="pl-9 max-w-[800px]">
                  {movie.overview === "" ? "No tagline found" : movie.overview}
                </p>
              </div>
              <div id="movie-credits">
                <h2 className="font-bold pl-5 pt-9">
                  Main characters <BetaBadge />
                </h2>
                <div className="flex flex-wrap">
                  {movieCredits.length === 0 && <p>No movie credits found</p>}
                  {movieCredits.slice(0, 5).map((credit) => (
                    <div
                      key={credit.id}
                      className="pt-4 pl-9 flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    >
                      <a href={`actor?id=${credit.id}`} className="flex w-full">
                        {credit.profile_path === null ? (
                          <img
                            className="w-[100px] h-[150px] box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                            alt={credit.name}
                          />
                        ) : (
                          <img
                            className="w-[100px] h-auto box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                            src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                            alt={credit.name}
                          />
                        )}
                        <div className="pl-4">
                          <p className="max-w-[200px] whitespace-nowrap pt-2 font-bold">
                            {credit.name === null
                              ? "No name found"
                              : credit.name}
                          </p>
                          <p className="max-w-[200px] text-gray-300 italic font-extralight text-sm mb-4">
                            as{" "}
                            {credit.character === null
                              ? "No character found"
                              : credit.character}
                          </p>
                          <p className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap pt-2 mb-9">
                            {credit.job === null
                              ? credit.known_for_department
                              : credit.job}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div id="producers-container">
                <h2 className="pt-7 pl-5">
                  Production companies <BetaBadge />
                </h2>
                <div id="producers-cards" className="pt-0 pl-9 flex flex-wrap">
                  {movie.production_companies &&
                    movie.production_companies.map((company) => (
                      <div
                        key={company.id}
                        id="producer-card"
                        className="w-[120px] h-[170px] bg-[#F5F6F9] mr-5 mb-5 rounded-lg border-2 border-gray-500 border-solid flex flex-col items-center p-2"
                      >
                        <div
                          id="image-container"
                          className="w-[100px] min-h-[80px] flex items-center justify-center overflow-hidden  rounded-t-lg"
                        >
                          {company.logo_path === null ? (
                            <img
                              className="max-w-full max-h-full object-contain"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                              alt={company.name}
                            />
                          ) : (
                            <div
                              id="logo-image"
                              className="w-full h-full bg-contain bg-no-repeat bg-center"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w200${company.logo_path})`,
                              }}
                            ></div>
                          )}
                        </div>
                        <p className="pt-3 text-black text-center text-sm overflow-hidden">
                          {company.name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div id="similar-movies" className="">
                <h2 className=" font-bold pl-5 pt-9">
                  Similar Movies{" "}
                  <a href="">
                    <BetaBadge text="NEW"/>
                  </a>
                </h2>

                {/* Wrapper pour centrer */}
                <div>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    loop={false}
                    centeredSlides={false}
                    grabCursor={true}
                    watchOverflow={true}
                    initialSlide={0}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      480: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                      },
                      1280: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                      },
                    }}
                  >
                    {similarMovies.length === 0 && (
                      <p>No similar movies found</p>
                    )}
                    {similarMovies.map((movie) => (
                      <SwiperSlide key={movie.id} className="pt-4">
                        <a href={`moviedetails?id=${movie.id}`}>
                          {movie.poster_path === null ? (
                            <img
                              className="w-[200px] h-[288px] box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                              alt={movie.name}
                            />
                          ) : (
                            <img
                              className="w-[200px] h-[288px] box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.name}
                            />
                          )}
                          <p className="max-w-[200] overflow-hidden text-ellipsis text-nowrap pt-2 mb-9">
                            {movie.title}
                          </p>
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
