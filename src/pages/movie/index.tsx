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
        <title>Next Movie</title>
        <meta name="description" content="Next Movie" />
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
