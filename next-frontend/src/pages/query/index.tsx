import { Inter } from 'next/font/google'
import { Fragment } from 'react';
import { 
  Box,
  Card,
  CardHeader,
  CardBody,
  Center,
  Divider,
  Textarea,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [value, setValue] = useState('');
  const handleInputChange = (e) => {
      const inputValue = e.target.value
      setValue(inputValue)
  }

  return (
    <Fragment>
      <VStack justify='center'>
        <Textarea
          w={'50%'}
          value={value}
          onChange={handleInputChange}
          placeholder='Here is a sample placeholder'
          size='sm'
        />
        <Card w='50%' h='full'>
          <CardHeader>
            Your Query
          </CardHeader>
          <Divider color='green' />
          <CardBody>
            <Text mb='8px'>{value}</Text>
          </CardBody>
        </Card>
      </VStack>
    </Fragment>
  )
};
