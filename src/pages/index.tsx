import type { NextPage } from 'next';
import Head from 'next/head';
import HeadMeta from '~/components/HeadMeta';

const Home: NextPage = () => {
  return (
    <>
      <HeadMeta title="" description="" image="" url="" />

      <div>
        <h1>Hello Home</h1>
      </div>
    </>
  );
};

export default Home;
