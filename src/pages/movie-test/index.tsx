import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { REACT_APP_API_KEY } from '~/config';

const MovieTest = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovie = async (name: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${name}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('error occurred in fetchMovie:', error);
      setMovies([]);
    }
  };

  const login = useCallback(() => {
    // 1. 백엔드에서 uuid를 만들어 달라는 요청을 보낸다
    // 2. 넘겨 받은 uuid를 바탕으로 sdk 에 로그인을 합니다
    // 3. 모든 요청이 성공했을 때, setState를 변경하여 화면의 렌더링을 바꿔줍니다
  }, []);

  useEffect(() => {
    fetchMovie('spiderman');
  }, []);

  return (
    <div>
      <h1>Hello Movie!</h1>

      {movies.map((movie: any) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default MovieTest;
