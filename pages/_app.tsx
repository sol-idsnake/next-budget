import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import BudgetProvider from '../contexts/BudgetContext';
import DatabaseProvider from '../contexts/DatabaseContext';
import { UserProvider } from '../contexts/UserContext';
import { clientSideEmotionCache, theme } from '../theme';

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <DatabaseProvider>
            <BudgetProvider>
              <Component {...pageProps} />
            </BudgetProvider>
          </DatabaseProvider>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
