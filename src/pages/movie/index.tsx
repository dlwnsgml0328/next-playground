import Head from 'next/head';
import React from 'react';

const Movie = () => {
  return (
    <>
      <Head>
        <title>Next Movie</title>
        <meta name="description" content="Next Movie" />
      </Head>

      <div>
        <h1>Hello Movie!</h1>
      </div>
    </>
  );
};

export default Movie;
