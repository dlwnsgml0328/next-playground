import axios from 'axios';
import { REACT_APP_API_KEY } from '@config';
import { useQuery } from '@tanstack/react-query';

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=spiderman`
    );

    return response.data.results;
  } catch (err) {
    console.error(err);
  }
};

const useMovies = () => {
  return useQuery(['movies'], fetchMovies);
};

export { useMovies };
