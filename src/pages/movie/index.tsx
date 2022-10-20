import React, { useCallback, useState } from 'react';
import HeadMeta from '~/components/HeadMeta';

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
      <HeadMeta
        title="movie search"
        description="you guys can search movie"
        image=""
        url={`https://next-playground-kappa.vercel.app/movie`}
      />

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
