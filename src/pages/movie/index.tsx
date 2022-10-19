import Head from 'next/head';
import React, { useCallback, useState } from 'react';

const Movie = () => {
  const [input, setInput] = useState('');

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      location.href = `/movie/${input}`;
    },
    [input]
  );
  return (
    <>
      <Head>
        <title>Next | Movie</title>
        <meta name="title" content="Next | Movie" />
        <meta name="description" content="This is a Next Movie" />

        <meta
          property="og:image"
          content="https://d28btnt2z9x7nc.cloudfront.net/static/logo/logo_2.png"
        />
      </Head>

      <div>
        <h1>Hello Movie</h1>
        <form onSubmit={onSubmit}>
          <input type="search" value={input} onChange={(e) => setInput(e.target.value)} />

          <input type="submit" value="search" />
        </form>
      </div>
    </>
  );
};

export default Movie;
