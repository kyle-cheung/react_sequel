import { type NextPageWithLayout } from "@/pages/_app";
import { getLayout } from "@/layouts/MainLayout";
import { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Flex justify="center">
        <Card h="400px" width="full" maxW="700px">
          <CardBody>
            <Center h="full">
              <VStack>
                <Text fontSize="2xl">Hello, Kyle</Text>
                <Button as={Link} href="/query">
                  Get Started
                </Button>
              </VStack>
            </Center>
          </CardBody>
        </Card>
      </Flex>
    </Fragment>
  );
};

export default Home;

Home.getLayout = getLayout;
