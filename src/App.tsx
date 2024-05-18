import React, { useEffect } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { fetchSongs } from './state/selectors';
import { currentSongState, songsState } from './state/atoms';
import './App.css';
import Blueprint from './components/utils/Blueprint';
import logo from '../src/assets/img.png';
import avatar from './assets/OIP (1).jpeg';
import SearchIcon from '@mui/icons-material/Search';

const tabsData = [
  "For You",
  "Top Tracks",
  "Favorites",
  "Recently Played"
];
function convertSecondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds}`;
}

function App() {
  const tracksLoadable = useRecoilValueLoadable(fetchSongs);
  const [currId, setCurrId] = React.useState(null);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  tracksLoadable.state === 'hasValue' && console.log(tracksLoadable.contents);

  return (
    <Blueprint style="bg-gradient-to-l from-black to-[#3A0202]"
      content1={
        <div className='hidden text-center h-full w-full md:flex flex-col justify-between'>
          <div><img className='p-3 invert-[100%]' src={logo} alt="Spotify LOGO" /></div>
          <div className='h-full text-left p-6 flex gap-2 flex-col text-xl font-semibold text-gray-400'>
            {tabsData.map((tab, i) => (<div key={i} style={{ cursor: "pointer" }} className={i === 0 ? "text-white" : ""}>{tab}</div>))}
          </div>
          <div className='text-left p-3'><img className='w-[4vmax] h-[4vmax] object-cover rounded-[50%] mx-4 mb-2' src={avatar} alt="avatar" /></div>
        </div>
      }
      content2={
        <div className='hidden h-full w-full md:flex flex-col justify-between'>
          <div className='p-4 mt-3 font-bold text-3xl'>For You</div>
          <div className='relative'>
            <input type='text' className='p-3 rounded-lg bg-[#383737] w-[85%] pr-12 text-sm m-auto' placeholder='Search Song, Artist' />
            <div className="absolute top-[7px] right-[70px]"><SearchIcon className="text-xl" fontSize='medium' /></div>
          </div>
          <div className='mt-4 w-full flex overflow-scroll flex-col justify-center'>
            {tracksLoadable.state === 'loading' ? <div className='w-[100%]  h-full text-center p-6'>Loading...</div> : tracksLoadable.state === 'hasValue'
              ? tracksLoadable.contents.data.map(
                (track, i) => (<div key={i} onClick={() => setCurrId(track.id)} style={currId === track.id ? { backgroundColor: "#464444" } : {}} className='p-2 rounded-md  w-[90%] hover:bg-[#4e4c4c] justify-between cursor-pointer flex flex-row  mt-4'>
                  <div className='w-[15%]'><img className='rounded-[50%]' src={track.image[2].url} alt="" /></div>
                  <div className='w-[75%] ml-2'>
                    <div> {track.name.length > 20 ? `${track.name.slice(0, 20)}...` : track.name}</div>
                    <div className='text-sm text-gray-300'>{track.artists.all[0].name > 20 ? `${track.artists.all[0].name.slice(0, 20)}...` : track.artists.all[0].name}</div>
                  </div>
                  <div className='w-[10%] text-gray-300'>{convertSecondsToMinutes(track.duration)}</div>
                </div>))
              : <div>Error</div>}
          </div>
        </div>
      }
      content3={<div>3</div>}
    />
  );
}

export default App;
