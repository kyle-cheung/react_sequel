import { type NextPageWithLayout } from "@/pages/_app";
import { getLayout } from "@/layouts/MainLayout";
import { Fragment } from "react";
import { Textarea, Flex, Center } from "@chakra-ui/react";
import { useState } from "react";
import MessageList from "@/components/MessageList";

const Query: NextPageWithLayout = () => {
  const [messages, setMessages] = useState([
    { id: "1", type: "user", content: `Show me all users with the id of 69` },
    { id: "2", type: "system", content: `SELECT * FROM USERS WHERE id='69';` },
  ]);

  return (
    <Fragment>
      <Center>
        <Flex direction="column" w="full" maxW="900px" gap={4}>
          <Textarea
            variant="filled"
            placeholder="What would you like to query?"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                const value = e.currentTarget.value;
                e.preventDefault();
                setMessages((current) => [
                  ...current,
                  {
                    id: Math.random().toString(),
                    type: "user",
                    content: value,
                  },
                ]);
                e.currentTarget.value = "";
              }
            }}
          />
          <MessageList messages={messages} />
        </Flex>
      </Center>
    </Fragment>
  );
};

export default Query;

Query.getLayout = getLayout;
