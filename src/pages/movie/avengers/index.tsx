import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '~/config';

const fetchMovies = async (name: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
    );

    if (!response) throw new Error(`Could not fetch movies -${name}`);

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Avengers = () => {
  const { data, isSuccess, isLoading, isError } = useQuery(['avengers'], () =>
    fetchMovies('avengers')
  );

  useEffect(() => {
    console.log('isLoading', isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess && data) console.log('data:', data);
  }, [isSuccess, data]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error Occured!</div>;

  if (!data && !isLoading) return <div>There is no data...</div>;

  return (
    <>
      <Head>
        <title>Movie | Avengers</title>
        <meta name="description" content="Movie | Avengers"></meta>
      </Head>

      <div>
        <h1>Hello Avengers</h1>

        {data.results.map((item: any) => (
          <div key={item.id}>
            <p>
              {item.title} - ({item.id})
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Avengers;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['avengers'], () => fetchMovies('avengers'));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
