import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '@config';
import { blurResults, ImovieData, ImovieResults } from '@types';
import Error from '@pages/_error';
import { getPlaiceholder } from 'plaiceholder';
import MoviePost from '@components/Movie';
import HeadMeta from '~/components/HeadMeta';

interface IMoviePosts {
  errorCode: number | boolean;
  data: ImovieData;
  blurData: blurResults[];
}

const MoviePosts = ({ errorCode, data, blurData }: IMoviePosts) => {
  if (errorCode !== false) {
    return <Error errorCode={errorCode} />;
  }

  if (data.results.length === 0) return <div>There is no data...</div>;

  return (
    <>
      <HeadMeta
        title="Movie | Spiderman"
        description="The results are all about the spiderman"
        url={`https://next-playground-kappa.vercel.app/spiderman`}
        image={`https://image.tmdb.org/t/p/w500${blurData[0].backdrop_path}`}
      />

      <MoviePost blurData={blurData} />
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
