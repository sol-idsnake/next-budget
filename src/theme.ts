import createCache from '@emotion/cache';
import { createTheme } from '@mui/material';

const theme = createTheme();

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

export { theme, clientSideEmotionCache };
