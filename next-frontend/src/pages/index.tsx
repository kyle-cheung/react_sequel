import Head from 'next/head';
import { Inter } from 'next/font/google'
import { Fragment } from 'react';
import { 
  Box,
  Button,
  Card,
  Center,
  VStack
} from '@chakra-ui/react';
import Link from 'next/link';
// import NavDrawer from '@/components/NavDrawer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Box>
      <Head>
        <title>BI Tool Thing</title>
      </Head>
      <Box>
        <Center>
          <Card w='50vw' h='20vh'>
            <VStack paddingTop={24}>
              <Box>Hello, Kyle</Box>
              <Box>
                <Button>Get Started</Button>
              </Box>
            </VStack>
          </Card>
        </Center>
      </Box>
    </Box>
  )
}
