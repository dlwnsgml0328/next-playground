import axios from 'axios';
import { REACT_APP_API_KEY } from '@config';
import { useQuery } from '@tanstack/react-query';
import { ImovieData } from '~/types';

const fetchMovies = async (name: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
    );

    console.log('response:', response);

    return response.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const useMovies = (name: string) => {
  return useQuery([`${name}`], () => fetchMovies(name));
};

const fetchFucMovies = async (name: string): Promise<ImovieData> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
    );

    if (!response) throw new Error(`Could not fetch movies -${name}`);

    return response.json();
  } catch (error) {
    console.error(error);
    return {
      page: -1,
      results: [],
      total_pages: -1,
      total_results: -1,
    };
  }
};

export { fetchMovies, fetchFucMovies, useMovies };
