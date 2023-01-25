import Head from 'next/head';

interface HeadMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}

const HeadMeta = ({ title, description, url, image }: HeadMeta) => {
  return (
    <Head>
      <title>{title || 'next'}</title>
      <meta name="description" content={description || 'next wave'} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property="og:description" content={description || 'next wave'} />
      <meta property="og:title" content={title || 'next'} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || 'https://next-playground-kappa.vercel.app'}
      />
      <meta
        property="og:image"
        content={image || 'https://d28btnt2z9x7nc.cloudfront.net/static/logo/logo_2.png'}
      />
      <meta property="og:article:author" content="next" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="original" data-rh="true" />
      <meta name="twitter:description" content={description || 'next wave'} />
      <meta
        name="twitter:site"
        content="@https://next-playground-kappa.vercel.app next"
      />
      <meta
        name="twitter:image"
        content={image || 'https://d28btnt2z9x7nc.cloudfront.net/static/logo/logo_2.png'}
      />
    </Head>
  );
};

export default HeadMeta;
