import type { AppProps } from 'next/app';
import GlobalStyle from '@styles/GlobalStyle';
import Header from '@components/Header';

function MyApp({ Component, pageProps }: AppProps<any>) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;