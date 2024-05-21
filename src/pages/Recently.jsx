import React, { useState, useRef, useEffect } from "react";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { fetchSongs } from "../state/selectors";
import {
  currentSongListState,
  currentSongState,
  currIdState,
} from "../state/atoms";
import Blueprint from "../components/utils/Blueprint";
import logo from "../assets/img.png";
import avatar from "../assets/OIP (1).jpeg";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Clear";
import AudioControls from "../components/AudioController";
import { ColorExtractor } from "react-color-extractor";
import { bgColorState } from "../state/atoms";
import { tabsData, darkenHexColor } from "../utils/util";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Recently() {
  const params = useLocation();
  const tracksLoadable = useRecoilValueLoadable(fetchSongs);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const audioRef = useRef(null);
  const [bgGradient, setBgGradient] = useRecoilState(bgColorState); // State for background gradient
  const [currId, setCurrId] = useRecoilState(currIdState); // State for current song id
  const [currentList, setCurrentList] = useRecoilState(currentSongListState); // State for current song list
  useEffect(() => {
    setCurrentList("");
  }, []);
  const getColors = (colors) => {
    if (colors && colors.length > 0) {
      const dominantColor = colors[0];
      const gradient = `linear-gradient(to bottom left, ${darkenHexColor(
        dominantColor,
        0.7
      )}, #000000)`;
      setBgGradient(gradient);
    }
  };
  const [query, setQuery] = useState("");
  useEffect(() => {
    handleFilterSongs();
  }, [query]);
  const handleFilterSongs = () => {
    const searchValue = query.toLowerCase();
    const filteredSongs = tracksLoadable?.contents?.data?.filter((song) =>
      song.name.toLowerCase().includes(searchValue)
    );
    setCurrentList(filteredSongs);
  };

  return (
    <Blueprint
      color={{ backgroundImage: bgGradient }} // Set background gradient dynamically
      content1={
        <div className="hidden text-center h-full w-full md:flex flex-col justify-between">
          <div>
            <img className="p-3 invert-[100%]" src={logo} alt="Spotify LOGO" />
          </div>
          <div className="h-full text-left p-6 flex gap-2 flex-col text-xl font-semibold text-gray-400">
            {tabsData.map((tab, i) => {
              const tabLabel = Object.keys(tab)[0]; // Extracting the label from the object
              const tabPath = Object.values(tab)[0]; // Extracting the path from the object
              return (
                <Link
                  key={i}
                  to={tabPath}
                  className="no-underline hover:no-underline"
                >
                  {" "}
                  <div
                    className="cursor-pointer no-underline hover:no-underline"
                    style={
                      params.pathname === tabPath
                        ? {
                            fontWeight: "bolder",
                            color: "white",
                          }
                        : { color: "gray", textDecoration: "none" }
                    }
                  >
                    {tabLabel}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-left p-3">
            <img
              className="w-[4vmax] h-[4vmax] object-cover rounded-[50%] mx-4 mb-2"
              src={avatar}
              alt="avatar"
            />
          </div>
        </div>
      }
      content2={
        <div className="h-[50%] md:h-full w-full md:flex flex-col justify-between">
          <div className="hidden md:flex p-4 mt-3  font-bold text-3xl">
            Recently{" "}
          </div>
          <div className="md:hidden p-4 mt-3 flex overflow-scroll gap-3 font-bold text-3xl">
            {tabsData.map((tab, i) => {
              const tabLabel = Object.keys(tab)[0]; // Extracting the label from the object
              const tabPath = Object.values(tab)[0]; // Extracting the path from the object
              return (
                <Link
                  key={i}
                  to={tabPath}
                  className="no-underline hover:no-underline"
                >
                  {" "}
                  <div
                    className="cursor-pointer no-underline hover:no-underline"
                    style={
                      params.pathname === tabPath
                        ? {
                            fontWeight: "bolder",
                            color: "white",
                          }
                        : {
                            color: "gray",
                            textDecoration: "none",
                            fontSize: "medium",
                          }
                    }
                  >
                    {tabLabel}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="relative text-center max-h-fit">
            <input
              type="text"
              className="p-3 rounded-lg bg-[#383737] w-[85%] pr-12 text-sm m-auto"
              placeholder="Search Song, Artist"
              onSubmit={handleFilterSongs}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute top-[7px] right-[40px]">
              {query === "" ? (
                <SearchIcon className="text-xl" fontSize="medium" />
              ) : (
                <>
                  <DeleteIcon
                    className="text-xl"
                    fontSize="medium"
                    onClick={() => setQuery("")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mt-4 w-full h-full flex overflow-scroll flex-col "></div>
        </div>
      }
      content3={
        <div className=" h-[50%] md:h-full w-full flex-col md:flex-row flex items-center justify-center">
          <div className="md:hidden m-3 p-3 text-left text-3xl font-extrabold">
            Spotify
          </div>
          <div className="w-[90%] md:w-[60%] flex md:h-[80%] flex-col">
            <div className="h-[20%] p-2">
              <div className="text-3xl font-semibold" title={currentSong?.name}>
                {currentSong
                  ? currentSong.name.length > 22
                    ? `${currentSong.name.slice(0, 22)}...`
                    : currentSong.name
                  : "No song selected"}
              </div>
              <div className="text-gray-400 text-lg">
                {currentSong?.artists?.all[0]
                  ? currentSong.artists.all[0].name
                  : ""}
              </div>
            </div>
            <div className="h-full w-full overflow-hidden">
              <ColorExtractor getColors={getColors}>
                <img
                  className="object-contain w-full h-full rounded-md"
                  src={currentSong?.image[2].url}
                  alt=""
                />
              </ColorExtractor>
            </div>
            <div className="p-1">
              <audio
                ref={audioRef}
                src={currentSong?.downloadUrl[2].url}
              ></audio>
              <AudioControls audioRef={audioRef} />
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Recently;
