import axios from 'axios';
import { REACT_APP_API_KEY } from '@config';
import { useQuery } from '@tanstack/react-query';

const fetchMovies = async (name: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
    );

    return response.data.results;
  } catch (err) {
    console.error(err);
  }
};

const useMovies = (name: string) => {
  return useQuery([`${name}`], () => fetchMovies(name));
};

export { useMovies };
