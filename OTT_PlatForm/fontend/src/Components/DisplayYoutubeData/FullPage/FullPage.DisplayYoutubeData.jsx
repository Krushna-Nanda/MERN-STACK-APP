import { useEffect, useState } from "react";
import { Navbar_DisplayYoutubeData } from "../FileContainer.DisplayYoutubeData.js";
import { FaHome } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { fetchVideos_API } from "../FileContainer.DisplayYoutubeData.js";
import axios from "axios";

export default function FullPage_DisPlayYoutubeData({ loggedInUserData }) {
  console.log(loggedInUserData)
  function MovieCart({ videoURL }) {
    const storeUserWatchHistory = ({ videoURL }) => {
      
        try {
          axios
            .post(
              "http://localhost:4000/api/storeWatchURL",
              { userData: { email: loggedInUserData.email, videoURL } },
              { withCredentials: true }
            )
            .then((res) => {
              console.log("storeWatchList response is ", res);
            })
            .catch((error) => {
              console.log(
                "Error at fullPageDisplayYouTubeData storeWatchList.js",
                error.message
              );
            });
        } catch (error) {
          console.log("error at storeUserWatchHistory = ", error.message);
        }
     
    };

    return (
      <div
        className="w-[30%] h-[400px] bg-white
       p-1 rounded-md"
        onClick={() => storeUserWatchHistory({ videoURL })}
      >
        <video
          src={videoURL}
          alt=""
          className="relative h-full w-full object-fill"
          loop
          controls
          // muted
        ></video>
      </div>
    );
  }
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userQuery = new URLSearchParams(location.search).get("q");
    console.log("UserQuery => ", userQuery);
    if (userQuery === null || userQuery === undefined || userQuery === "") {
      alert("Query Is Null");
    } else {
      fetchVideos_API({ query: userQuery, setVideos });
    }
    
  }, []);

  const navigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="bg-black text-white w-full min-h-[750px] h-fit flex flex-col items-center gap-y-20 py-10 ">
      <div
        onClick={navigateToHomePage}
        className="text-3xl absolute right-10 top-2 hover:bg-green-600 px-3 py-2 rounded-md"
      >
        <FaHome />
      </div>
      <Navbar_DisplayYoutubeData setVideos={setVideos} />

      <div className="flex flex-wrap justify-between gap-10 px-10">
        {videos.map((url) => {
          // console.log(url)
          return <MovieCart key={Math.random()} videoURL={url} />;
        })}
      </div>
    </div>
  );
}
