import React from 'react';
import type { AppProps } from 'next/app';
import GlobalStyle from '@styles/GlobalStyle';
import Header from '@components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function MyApp({ Component, pageProps }: AppProps<any>) {
  const [queryClient] = React.useState(() => new QueryClient());

  console.log('- queryClient changed:', queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
