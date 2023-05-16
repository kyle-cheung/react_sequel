import React from 'react';
import {
  Box,
  BoxProps,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Link,
  useColorModeValue,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import NextLink from 'next/link';

interface LinkItemProps {
  name: string;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', href: '/' },
  { name: 'Query', href: '/query' },
  { name: 'History', href: '/history' },
];

export const NavDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
    <Box backgroundColor={'primary'}>
      <IconButton
        aria-label='Open drawer'
        size={'lg'}
        mt={3}
        ml={2}
        variant={'unstyled'}
        onClick={onOpen}
        icon={<FiChevronRight size='md' />}
      />
      <Drawer
        variant={'mobile'}
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}>
        <DrawerOverlay display="none" />
        <DrawerContent>
          <Box
            borderLeft={'3px solid black'}
            bg={useColorModeValue('white', 'gray.900')}
            h="full">
            <IconButton
              aria-label={'Close drawer'}
              size={'lg'}
              mt={3}
              ml={2}
              variant={'unstyled'}
              onClick={onClose}
              icon={<FiChevronLeft size={'md'} />}
            />

            <VStack align={'flex-end'} p={3}>
              {LinkItems.map((link, index) => (
                <NextLink
                  passHref
                  key={`${index}${link.name}`}
                  href={link.href ?? '/'}>
                  <Link cursor={'pointer'} onClick={onClose}>
                    {link.name}
                  </Link>
                </NextLink>
              ))}
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
