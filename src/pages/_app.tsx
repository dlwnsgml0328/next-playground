import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import GlobalStyle from '@styles/GlobalStyle';
import Header from '@components/Header';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function MyApp({ Component, pageProps }: AppProps<any>) {
  const [queryClient] = React.useState(() => new QueryClient());

  // console.log('- queryClient changed:', queryClient);

  useEffect(() => {
    console.log('- pageProps.dehydratedState:', pageProps.dehydratedState);
  }, [pageProps.dehydratedState]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyle />
      <Header />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
