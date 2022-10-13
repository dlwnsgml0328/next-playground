import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '@config';
import { blurResults, ImovieData, ImovieResults } from '@types';
import { ParsedUrlQuery } from 'querystring';
import Error from '../_error';
import { getPlaiceholder } from 'plaiceholder';
import MoviePost from '@components/Movie';

interface IMoviePosts {
  errorCode: number | boolean;
  data: ImovieData;
  blurData: blurResults[];
  params: ParsedUrlQuery | undefined;
}

const MoviePosts = ({ errorCode, data, blurData, params }: IMoviePosts) => {
  useEffect(() => {
    console.log('blurData:', blurData);
  }, [blurData]);

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  if (errorCode !== false) {
    return <Error errorCode={errorCode} />;
  }

  if (data.results.length === 0) return <div>There is no data...</div>;

  return (
    <>
      <Head>
        <title>{params?.name ? `Movie | ${params?.name}` : `Movie`}</title>
        <meta
          name="description"
          content={params?.name ? `Movie ${params?.name}` : `Movie`}
        ></meta>
      </Head>

      <MoviePost blurData={blurData} />
    </>
  );
};

export default MoviePosts;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log('context:', context);

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

  // console.log('- data.results:', data.results);

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

  // console.log('- posterWithBlurURL:', posterWithBlurURL);

  return { props: { errorCode, data, blurData: posterWithBlurURL, params } };
}
