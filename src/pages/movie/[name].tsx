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

  await queryClient.prefetchQuery([`${context.params?.name}`], () =>
    fetchFucMovies(`${context.params?.name}`)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient), params: context.params },
  };
}
