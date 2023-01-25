import axios from 'axios';
import { REACT_APP_API_KEY } from '@config';
import { useQuery } from '@tanstack/react-query';
import { ImovieData } from '~/types';

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));

const fetchLatest = async () => {
  await delay(2000);
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${REACT_APP_API_KEY}&language=en-US`
  );

  console.log('response:', response);

  return response.data.results;
};

const fetchMovies = async (name: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
  );

  return response.data.results;
};

const useLatestMovies = () => {
  return useQuery({
    queryKey: ['latestMovie'],
    queryFn: () => fetchLatest(),
  });
};

const useMovies = (name: string) => {
  return useQuery({
    queryKey: [`${name}`],
    queryFn: () => fetchMovies(name),
    retry: 3,
  });
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

export { fetchLatest, fetchMovies, fetchFucMovies, useMovies, useLatestMovies };
