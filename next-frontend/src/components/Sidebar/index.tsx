import { Card, Flex } from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineConsoleSql,
  AiOutlineHistory,
} from "react-icons/ai";
import Link from "next/link";

const routes = [
  {
    Icon: AiOutlineHome,
    path: "/",
  },
  {
    Icon: AiOutlineConsoleSql,
    path: "/query",
  },
  {
    Icon: AiOutlineHistory,
    path: "/history",
  },
];

const Sidebar = () => {
  return (
    <Flex
      w="full"
      h="full"
      bg="gray.900"
      justify="flex-start"
      align="center"
      flexDir="column"
      pt={3}
      gap={3}
    >
      {routes.map((route, index) => {
        const { path, Icon } = route;
        return (
          <Card
            key={`sidebar_item_${index}`}
            as={Link}
            href={path}
            display="flex"
            align="center"
            justify="center"
            w="65px"
            h="65px"
            transition="background 150ms"
            _hover={{ bg: "gray.600" }}
          >
            <Icon fontSize="40px" />
          </Card>
        );
      })}
    </Flex>
  );
};

export default Sidebar;
