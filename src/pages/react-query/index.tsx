import React from 'react';
import { useMovies } from '@hooks';

const ReactQueryComponent = () => {
  const {
    isSuccess: movieIsSuccess,
    isLoading: movieIsLoading,
    isError: movieIsError,
    data: movieData,
    error: movieError,
  } = useMovies('spiderman');

  if (movieIsLoading) {
    return <span>Loading...</span>;
  }

  if (movieIsError) {
    console.warn('error', movieError);
    return <span>Error... </span>;
  }

  if (movieIsSuccess && movieData.length === 0) {
    return <span>There is no data...</span>;
  }

  return (
    <div>
      <h1>Hello React Query!</h1>

      {movieData.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default ReactQueryComponent;
