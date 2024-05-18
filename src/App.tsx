import { useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { fetchSongs } from './state/selectors';
import './App.css';
import Blueprint from './components/utils/Blueprint';
import logo from '../src/assets/img.png'
import avatar from './assets/OIP (1).jpeg'
import SearchIcon from '@mui/icons-material/Search';
const tabsData = [
  "For You",
  "Top Tracks",
  "Favorites",
  "Recently Played"
]
function App() {
  const tracksLoadable = useRecoilValueLoadable(fetchSongs);

  useEffect(() => {
    if (tracksLoadable.state === 'hasValue') {
      console.log(tracksLoadable.contents);
    } else if (tracksLoadable.state === 'hasError') {
      console.error('Error fetching tracks:', tracksLoadable.contents);
    }
  }, [tracksLoadable]);

  return (
    <Blueprint style="bg-gradient-to-l from-black to-[#3A0202]" content1={
      <div className='hidden  text-center h-full w-full md:flex flex-col justify-between'>
        <div><img className='p-3 invert-[100%]' src={logo} alt="Spotify LOGO" /></div>
        <div className='h-full text-left p-6 flex gap-2 flex-col text-xl  font-semibold text-gray-400'>
          {tabsData.map((tab, i) => (<div style={{ cursor: "pointer" }} className={i === 0 ? "text-white" : ""}>{tab}</div>))}
        </div>
        <div className='text-left p-3'><img className='w-[4vmax] h-[4vmax] object-cover rounded-[50%] mx-4 mb-2' src={avatar} alt="avatar" /></div>
      </div>

    } content2={<div className='hidden h-full w-full md:flex flex-col justify-between'>
      <div className='p-4 mt-3 font-bold text-3xl'>For You</div>
      <div className='relative'><input type='text' className='p-3 rounded-lg bg-[#383737] w-[80%] pr-12 text-sm m-auto' placeholder='Serach Song, Artist' />
        <div className="absolute top-[7px] right-[83px]"><SearchIcon className="text-xl " fontSize='medium' /></div>
      </div>
      <div className='h-full'></div>
    </div>} content3={<>3</>} />
  );
}

export default App;
