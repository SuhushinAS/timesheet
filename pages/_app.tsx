import 'app/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { isClient } from 'shared/config/constants';

/* const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      // eslint-disable-next-line no-console
      console.error('SW registration failed:', error);
    });
  }
}; */

/* if (isClient && process.env.NODE_ENV === 'production') {
  window.removeEventListener('load', registerServiceWorker);
  window.addEventListener('load', registerServiceWorker);
} */

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => (
  <div id="root" suppressHydrationWarning>
    {isClient ? <Component {...pageProps} /> : undefined}
  </div>
);

export default MyApp;
