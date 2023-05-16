import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppType } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/config/theme";

import "@/styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppType & {
  Component: NextPageWithLayout;
  pageProps: any;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Fragment>
      <Head>
        <title>BI Tool Thing</title>
      </Head>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </Fragment>
  );
}
