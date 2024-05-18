import { selector } from 'recoil';
import axios from 'axios';

export const fetchSongs = selector({
    key: 'fetchSongs',
    get: async () => {

        const response = await axios.get('https://v1.nocodeapi.com/adityanocodeapi/spotify/heKTbpHSvXUIIEZP/browse/new?country=india&perPage=15');
        return response.data;

    },
});
