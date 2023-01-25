import Image from 'next/image';
import React from 'react';
import * as S from './index.styles';

const MovieLoading = () => {
  return (
    <S.MoviePosts>
      <div className="movie-wrap">
        {Array(20)
          .fill('a')
          .map((_, idx) => (
            <div className="movie" key={idx}>
              <div className="shimmer-wrapper"></div>
            </div>
          ))}
      </div>
    </S.MoviePosts>
  );
};

export default MovieLoading;
