const API = process.env.REACT_APP_API_KEY;
const API_KEY = API.replace(/[^A-Za-z0-9]/g, '');
if (!API_KEY) {
  throw new Error('REACT_APP_API_KEY is not defined. Please set it in your environment variables.');
} 


const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

console.log(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`); 
 
export default requests;