import Head from 'next/head';
import React, { useEffect } from 'react';
import { REACT_APP_API_KEY } from '@config';
import { blurResults, ImovieData, ImovieResults } from '@types';
import { ParsedUrlQuery } from 'querystring';
import Error from '../../_error';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

interface IMoviePosts {
  errorCode: number | boolean;
  data: ImovieData;
  blurData: blurResults[];
}

const MoviePosts = ({ errorCode, data, blurData }: IMoviePosts) => {
  useEffect(() => {
    console.log('blurData:', blurData);
  }, [blurData]);

  useEffect(() => {
    console.log('data:', data);
  }, [data]);

  if (errorCode !== false) {
    return <Error errorCode={errorCode} />;
  }

  if (data.results.length === 0) return <div>There is no data...</div>;

  return (
    <>
      <Head>
        <title>Movie | Spiderman</title>
        <meta name="description" content="Movie | Spiderman"></meta>
      </Head>

      <div>
        <h1>Hello Movie Spiderman</h1>

        <button onClick={() => (location.href = '/movie')}>Back</button>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {blurData?.map((movie) => (
            <div
              style={{ marginTop: 5, display: 'flex', marginRight: 10 }}
              key={movie.id}
            >
              <div style={{ position: 'relative', color: 'white' }}>
                <Image
                  width={250}
                  height={200}
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                      : `https://freesvg.org/img/1645699345cat.png`
                  }
                  alt={movie.title}
                  placeholder="blur"
                  blurDataURL={movie.blurDataURL}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    textShadow: '#000 1px 0 10px',
                  }}
                >
                  {movie.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviePosts;

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=spiderman`
  );

  const errorCode = res.ok ? false : res.status;

  if (errorCode) {
    console.log('- errorCode:', errorCode);
    return { props: { errorCode } };
  }

  const data: ImovieData = await res.json();

  const posterWithBlurURL = await Promise.all(
    data.results.map(async (movie: ImovieResults) => {
      const { base64 } = await getPlaiceholder(
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://freesvg.org/img/1645699345cat.png'
      );
      return { ...movie, blurDataURL: base64 };
    })
  );

  return { props: { errorCode, data, blurData: posterWithBlurURL } };
}
