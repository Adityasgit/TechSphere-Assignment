import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaEllipsisH,
  FaHeart,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  currentSongListState,
  currentSongState,
  currIdState,
  favouritesState,
  playingState,
  progressState,
} from "../state/atoms";

const AudioControls = ({ audioRef }) => {
  const [progress, setProgress] = useRecoilState(progressState);
  const [favourites, setFavourites] = useRecoilState(favouritesState);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [currentList, setCurrentList] = useRecoilState(currentSongListState);
  const [currId, setCurrId] = useRecoilState(currIdState);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong, audioRef]);

  useEffect(() => {
    if (audioRef.current !== null && typeof audioRef.current !== "undefined") {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const onVolumeChange = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
  }, [audioRef]);

  useEffect(() => {
    setProgress(0); // Reset progress when currentSong changes
  }, [currentSong]);

  const onPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const onNext = () => {
    const currentIndex = currentList.findIndex(
      (track) => track.id === currentSong?.id
    );
    if (currentIndex !== -1 && currentIndex < currentList.length - 1) {
      const nextTrack = currentList[currentIndex + 1];
      setCurrentSong(nextTrack);
      setCurrId(nextTrack.id);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  const onPrevious = () => {
    const currentIndex = currentList.findIndex(
      (track) => track.id === currentSong?.id
    );
    if (currentIndex > 0) {
      const previousTrack = currentList[currentIndex - 1];
      setCurrentSong(previousTrack);
      setCurrId(previousTrack.id);
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const clickProgress = (clickPosition / progressBarWidth) * 100;
    const newTime = (clickProgress / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(clickProgress);
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    const newVolume = isMuted ? 1 : 0; // If muted, set volume to 1 (unmuted), otherwise set volume to 0 (muted)
    onVolumeChange(newVolume);
  };

  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = currentSong?.downloadUrl[2].url; // Provide the URL to the song file
    anchor.download = `${currentSong.name}.mp3`; // Set the filename for the downloaded file
    anchor.click();
  };

  const handleFav = () => {
    if (favourites.some((song) => song.id === currentSong.id)) {
      setFavourites(favourites.filter((song) => song?.id !== currentSong.id));
    } else {
      setFavourites([...favourites, currentSong]);
    }
  };

  const isFavorite =
    favourites.length > 0 &&
    favourites.some((song) => song?.id === currentSong?.id);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 bg-transparent rounded-lg ">
      <div
        className="relative w-full h-1 bg-gray-600 rounded-full cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="absolute top-0 left-0 h-1 bg-white rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <button className="text-xl text-white" onClick={handleDownload}>
          <FaEllipsisH />
        </button>
        <button onClick={onPrevious} className="text-2xl text-white">
          <FaBackward />
        </button>
        <button onClick={onPlayPause} className="text-4xl text-white mx-4">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={onNext} className="text-2xl text-white">
          <FaForward />
        </button>
        <button onClick={handleVolumeToggle} className="text-2xl text-white">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <button onClick={handleFav} className="text-2xl text-white">
          <FaHeart className={isFavorite ? "text-red-600" : "text-white"} />
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
