import Head from 'next/head';
import { Inter } from 'next/font/google'
import { Fragment } from 'react';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>BI Tool Thing</title>
      </Head>
      <Box>
        hi
      </Box>
    </Fragment>
  )
}
