import Head from 'next/head';
import Image from 'next/image';

const Test = () => {
  return (
    <div>
      <Head>
        <title>Test</title>
        <meta name="description" content="test image" />

        <meta name="twitter:card" content="summary_large_image" data-rh="true" />
        <meta name="twitter:title" content="original" data-rh="true" />
        <meta name="twitter:description" content="Image twitter" data-rh="true" />
        <meta
          name="twitter:image"
          content="https://upload.wikimedia.org/wikipedia/commons/b/b7/Mandelbrot_set_5000px.png"
          data-rh="true"
        />
      </Head>
      <h1>Image test</h1>
      <div>
        <Image
          width={1000}
          height={1000}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mandelbrot_set_5000px.png'
          }
          alt="image"
        />
      </div>

      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Mandelbrot_set_5000px.png"
          alt="image"
        />
      </div>
    </div>
  );
};

export default Test;
