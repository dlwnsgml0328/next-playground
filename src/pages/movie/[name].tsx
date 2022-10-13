import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const MoviePosts = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Head>
        <title>{name ? `Movie ${name}` : `Movie`}</title>
        <meta name="description" content={name ? `Movie ${name}` : `Movie`}></meta>
      </Head>

      <div>
        <h1>Hello Movie {name}</h1>
      </div>
    </>
  );
};

export default MoviePosts;
