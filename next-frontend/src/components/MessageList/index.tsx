import type { FC } from "react";
import type { Message } from "@/components/MessageList/MessageItem";
import MessageItem from "@/components/MessageList/MessageItem";
import { Flex } from "@chakra-ui/react";

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <Flex direction="column" gap={4}>
      {messages.map((message, index) => {
        // Need a better way of connecting the user message to the server message
        if (message.type !== "system") {
          return (
            <MessageItem
              key={message.id}
              userMessage={message}
              serverMessage={messages?.[index + 1]}
            />
          );
        }
      })}
    </Flex>
  );
};

export default MessageList;
