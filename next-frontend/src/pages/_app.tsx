import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { NavDrawer } from '@/components/NavDrawer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NavDrawer />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
