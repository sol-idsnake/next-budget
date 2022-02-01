import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { BudgetProvider } from '../src/context/BudgetProvider';
import { UserProvider } from '../src/context/UserProvider';
import '../src/styles/tailwind.css';
import { clientSideEmotionCache, theme } from '../src/theme';

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <UserProvider>
          <BudgetProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </BudgetProvider>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
