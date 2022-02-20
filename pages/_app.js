import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Raleway',
  },
});

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>;
};
export default MyApp;
