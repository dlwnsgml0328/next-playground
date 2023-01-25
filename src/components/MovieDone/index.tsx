import Image from 'next/image';
import React from 'react';
import * as S from './index.styles';

const MovieDone = ({ movieData }: { movieData: any }) => {
  return (
    <S.MoviePosts>
      <div className="movie-wrap">
        {movieData.map((movie: any) => (
          <div className="movie" key={movie.id}>
            <div className="image-wrap">
              <Image
                layout="fill"
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                    : `https://freesvg.org/img/1645699345cat.png`
                }
                alt={movie.title}
              />
              <span>{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </S.MoviePosts>
  );
};

export default MovieDone;
