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

export default function TvDetails() {
  const [serie, setSeries] = useState({});
  const [similarShows, setSimilarShows] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Ensure id is defined before making the API call
      setLoading(true);
      try {
        const response = await fetch(`/api/tvdetails?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log
        setSeries(data);

        const similarResponse = await fetch(`/api/similartv?id=${id}`);
        if (!similarResponse.ok) {
          throw new Error(`HTTP error! status: ${similarResponse.status}`);
        }
        const similarData = await similarResponse.json();
        setSimilarShows(similarData.results);

        const creditsResponse = await fetch(`/api/tvcredits?id=${id}`);
        if (!creditsResponse.ok) {
          throw new Error(`HTTP error! status: ${creditsResponse.status}`);
        }
        const creditsData = await creditsResponse.json();
        setTvCredits(creditsData.cast);
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
    if (!date) return "Unknown release date";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <Head> 
        <title>{serie.name || "TV/Serie Details"}</title>
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
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover brightness-[.3]"
                  src={`https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`}
                  alt={serie.title}
                />
                <img
                  className="relative top-4 left-2 h-[350px] w-auto object-cover z-10"
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.title}
                />
                <div className="relative z-10 pt-9 pl-3 ml-4 max-w-3xl">
                  <h1 className="text-4xl font-bold">{serie.name}</h1>
                  <p className="pt-3 text-gray-300 italic">{serie.tagline === "" ? "No tagline found" : serie.tagline}</p>
                  <p className="pt-3 pb-3">
                    {formatDate(serie.first_air_date)}
                  </p>
                  {serie.status === "Returning Series" ? (
                    <p className="bg-orange-600 bg-opacity-25 max-w-32 h-[30px] border border-orange-400 rounded-md flex items-center justify-center">
                      {serie.status}
                    </p>
                  ) : serie.status === "Canceled" ? (
                    <p className="bg-red-600 bg-opacity-25 max-w-24 h-[30px] border border-red-400 rounded-md flex items-center justify-center">
                      {serie.status}
                    </p>
                  ) : (
                    <p className="bg-green-600 bg-opacity-25 max-w-14 h-[30px] border border-green-400 rounded-md flex items-center justify-center">
                      {serie.status}
                    </p>
                  )}
                  <p className="pt-3">{serie.vote_average} (of {serie.vote_count} total votes)</p>
                  <p className="pt-3">
                    Genres:{" "}
                    {serie.genres &&
                      serie.genres.map((genre) => genre.name).join(" | ")}
                  </p>
                </div>
              </div>
            </div>

            <div id="infos">
            <div id="plot-container">
                <h2 className="pt-7 pl-5">Plot</h2>
                <p className="pl-9 max-w-[800px]">
                  {serie.overview === "" ? "No plot available" : serie.overview}
                </p>
            </div>
            <div id="tv-credits">
                <h2 className="pt-7 pl-5">Main characters <BetaBadge /></h2>
                <div className="flex flex-wrap">
                      {tvCredits.length === 0 && <p className="text-center pb-4">No cast found</p>}
                      {tvCredits.slice(0, 5).map((credit) => (
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
                  {serie.production_companies &&
                    serie.production_companies.map((company) => (
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

            <div id="similarShows" className="">
                <h2 className="font-bold pl-5 pt-9">Similar Shows <BetaBadge text="NEW" /></h2>

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
                    {similarShows.length === 0 && (
                      <p className="text-center pb-4">No similar movies found</p>
                    )}
                    {similarShows.map((show) => (
                      <SwiperSlide key={show.id} className="pt-4">
                        <a href={`tvdetails?id=${show.id}`}>
                          {show.poster_path === null ? (
                            <img
                              className="w-[200px] h-[288px] box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                              alt={show.name}
                            />
                          ) : (
                            <img
                              className="w-[200px] h-[288px] box-border rounded-lg object-cover transition transform duration-500 hover:scale-105 hover:rotate-[3deg]"
                              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                              alt={show.name}
                            />
                          )}
                          <p className="max-w-[200] overflow-hidden text-ellipsis text-nowrap pt-2 mb-9">
                            {show.name}
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
