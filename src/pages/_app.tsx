import 'assets/stylesheets/styles.scss';
import { AppProps } from 'next/app';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { apiFetcher } from 'services/api';
import store from 'store';
import { SWRConfig } from 'swr';
import './globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <SWRConfig value={{ fetcher: apiFetcher }}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SWRConfig>
    </CookiesProvider>
  );
}

export default MyApp
