import Head from 'next/head';
import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '@config';
import { blurResults, ImovieData, ImovieResults } from '@types';
import { getPlaiceholder } from 'plaiceholder';
import MoviePost from '@components/Movie';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useMovies } from '~/hooks';

const getSpiderMan = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=spiderman`
    );

    const errorCode = response.ok ? false : response.status;

    if (errorCode) {
      throw new Error(`Unexpected error: ${errorCode}`);
    }

    const data: ImovieData = await response.json();

    const posterWithBlurURL = await Promise.all(
      data.results.map(async (movie: ImovieResults) => {
        const { base64 } = await getPlaiceholder(
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://freesvg.org/img/1645699345cat.png'
        );
        return { ...movie, blurDataURL: base64 };
      })
    );

    return posterWithBlurURL;
  } catch (error) {
    console.error('error occurred: ' + error);
    return {
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: -1,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: -1,
      poster_path: '',
      release_date: '',
      title: '',
      video: false,
      vote_average: -1,
      vote_count: -1,
    };
  }
};

const MoviePosts = () => {
  const {
    isLoading,
    isSuccess,
    error,
    data: movieData,
  } = useQuery(['movie'], getSpiderMan);

  useEffect(() => {
    console.log('- query isLoading: ', isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log('- query movieData: ', movieData);
  }, [movieData]);

  if (isLoading) return <div>Loading...</div>;

  if (!movieData) return <div>No data...</div>;

  return (
    <>
      <Head>
        <title>Movie | Spiderman</title>
        <meta name="description" content="Movie | Spiderman"></meta>
      </Head>

      {/* <MoviePost blurData={movieData.results} /> */}
    </>
  );
};

export default MoviePosts;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movie'], getSpiderMan);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
