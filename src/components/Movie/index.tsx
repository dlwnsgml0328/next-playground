import React from 'react';
import { blurResults } from '@types';
import * as S from './index.styles';
import Image from 'next/image';

interface IMoviePost {
  blurData: blurResults[];
}

const MoviePost = ({ blurData }: IMoviePost) => {
  return (
    <S.MoviePosts>
      <button onClick={() => (location.href = '/movie')}>Back</button>

      <div className="movie-wrap">
        {blurData?.map((movie) => (
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
                placeholder="blur"
                blurDataURL={movie.blurDataURL}
              />
              <span>{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </S.MoviePosts>
  );
};

export default MoviePost;
