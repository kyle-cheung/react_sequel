import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex minH="100vh">
      <Box flex="0 0 90px" minH="full">
        <Sidebar />
      </Box>
      <Box flex="0 1 100%" p={4}>
        {children}
      </Box>
    </Flex>
  );
};

export const getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
