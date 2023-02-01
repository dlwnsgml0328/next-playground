import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '@config';
import { blurResults, ImovieData, ImovieResults } from '@types';
import Error from '@pages/_error';
import { getPlaiceholder } from 'plaiceholder';
import MoviePost from '@components/Movie';
import HeadMeta from '~/components/HeadMeta';
import { useLatestMovies, useMovies } from '~/hooks';
import MovieLoading from '~/components/MovieLoading';
import MovieDone from '~/components/MovieDone';

interface IMoviePosts {
  errorCode: number | boolean;
  data: ImovieData;
  blurData: blurResults[];
}

const random = Math.floor(Math.random() * 5 + 1);

const MoviePosts = ({ errorCode, data, blurData }: IMoviePosts) => {
  const queryMovieData = useLatestMovies();

  if (errorCode !== false) {
    return <Error errorCode={errorCode} />;
  }

  if (data.results.length === 0) return <div>There is no data...</div>;

  return (
    <>
      <button onClick={() => alert('Hey!')}>Hey</button>

      <HeadMeta
        title="Movie | Spiderman"
        description="The results are all about the spiderman"
        url={`https://next-playground-kappa.vercel.app/spiderman`}
        image={`https://image.tmdb.org/t/p/w500${blurData[random || 0].backdrop_path}`}
      />

      <MoviePost blurData={blurData} />

      <h1>Top Rated</h1>

      {queryMovieData.status === 'loading' && <MovieLoading />}
      {queryMovieData.status === 'error' && <h1>Error</h1>}
      {queryMovieData.status === 'success' && queryMovieData.data && (
        <MovieDone movieData={queryMovieData.data} />
      )}
    </>
  );
};

export default MoviePosts;

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=spiderman`
  );

  const errorCode = res.ok ? false : res.status;

  if (errorCode) {
    console.log('- errorCode:', errorCode);
    return { props: { errorCode } };
  }

  const data: ImovieData = await res.json();

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

  return { props: { errorCode, data, blurData: posterWithBlurURL } };
}
