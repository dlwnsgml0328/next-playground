import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import HeadMeta from '~/components/HeadMeta';
import { blurResults, ImovieData, ImovieResults } from '~/types';
import { getPlaiceholder } from 'plaiceholder';
import { REACT_APP_API_KEY } from '~/config';
import MoviePost from '~/components/Movie';
import Error from '../_error';

interface IMoviePosts {
  errorCode: number | boolean;
  blurData: blurResults[];
  params: ParsedUrlQuery | undefined;
}

const MoviePosts = ({ errorCode, blurData, params }: IMoviePosts) => {
  if (errorCode !== false) return <Error errorCode={errorCode} />;

  return (
    <>
      <HeadMeta
        title={`Movie | ${params?.name}`}
        description={`${params?.name}에 대한 검색 결과입니다.`}
        url={`https://next-playground-kappa.vercel.app/movie/${params?.name}`}
        image={`https://image.tmdb.org/t/p/w500${blurData[0].backdrop_path}`}
      />

      <h1>{params?.name}</h1>

      <MoviePost blurData={blurData} />
    </>
  );
};

export default MoviePosts;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${context.params?.name}`
  );

  const errorCode = res.ok ? false : res.status;

  const { params } = context;

  if (errorCode) {
    console.log('- errorCode:', errorCode);
    return { props: { errorCode, params } };
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

  return {
    props: {
      errorCode,
      blurData: posterWithBlurURL,
      params,
    },
  };
}
