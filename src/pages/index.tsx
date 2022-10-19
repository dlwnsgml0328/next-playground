import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Eazel Home" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://d28btnt2z9x7nc.cloudfront.net/static/logo/melting_logo.png"
        />
      </Head>

      <div>
        <h1>Hello Home</h1>
      </div>
    </>
  );
};

export default Home;
