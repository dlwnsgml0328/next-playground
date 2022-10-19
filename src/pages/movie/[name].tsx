import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { fetchFucMovies } from '@hooks';

interface IMoviePosts {
  params: ParsedUrlQuery;
}

const MoviePosts = ({ params }: IMoviePosts) => {
  const {
    isLoading,
    isSuccess,
    error,
    data: movieData,
  } = useQuery([`${params.name as string}`], () => fetchFucMovies(`${params.name}`));

  const {
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    error: error2,
    data: movieData2,
  } = useQuery([`${params.name as string}2`], () => fetchFucMovies(`${params.name}2`));

  useEffect(() => {
    console.log('- query isLoading: ', isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log('- query isSuccess: ', isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    console.log('- query error: ', error);
  }, [error]);

  useEffect(() => {
    console.log('- query movieData: ', movieData);
  }, [movieData]);

  useEffect(() => {
    console.log('- query isLoading2:', isLoading2);
  }, [isLoading2]);

  useEffect(() => {
    console.log('- query isSuccess2:', isSuccess2);
  }, [isSuccess2]);

  useEffect(() => {
    console.log('- query error2:', error2);
  }, [error2]);

  useEffect(() => {
    console.log('- query movieData2: ', movieData2);
  }, [movieData2]);

  return (
    <>
      <Head>
        <title>{params?.name ? `Movie | ${params?.name}` : `Movie`}</title>
        <meta
          name="description"
          content={params?.name ? `Movie ${params?.name}` : `Movie`}
        ></meta>
      </Head>

      <h1>{params?.name}</h1>

      {movieData?.results.map((item) => (
        <div key={item.id}>
          <p>
            {item.title}- ({item.id})
          </p>
        </div>
      ))}
    </>
  );
};

export default MoviePosts;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery([`${context.params?.name}`], () =>
      fetchFucMovies(`${context.params?.name}`)
    ),
    queryClient.prefetchQuery([`${context.params?.name}2`], () =>
      fetchFucMovies(`${context.params?.name}2`)
    ),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient), params: context.params },
  };
}
