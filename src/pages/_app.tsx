import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext } from 'react';
import Header from '~/components/Header';
import GlobalStyle from '~/styles/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps<any>) {
  const [queryClient] = React.useState(() => new QueryClient());
  const MyContext = createContext('default value');

  return (
    <MyContext.Provider value="Hello World">
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Header />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </MyContext.Provider>
  );
}

export default MyApp;
