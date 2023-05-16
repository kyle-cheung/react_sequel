import { Card, CardBody, Skeleton } from "@chakra-ui/react";
import type { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula as codeBlock } from "react-syntax-highlighter/dist/cjs/styles/prism";

export interface Message {
  id: string;
  type: string;
  content: string;
}

interface MessageItemProps {
  userMessage: Message;
  serverMessage?: Message;
}

const MessageItem: FC<MessageItemProps> = ({ userMessage, serverMessage }) => {
  return (
    <Card overflow="hidden">
      <CardBody>{userMessage.content}</CardBody>
      <Skeleton isLoaded={!!serverMessage}>
        {/* @ts-ignore "or" type is broken */}
        <SyntaxHighlighter
          language="sql"
          style={codeBlock}
          customStyle={{ margin: 0, padding: "20px" }}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
        >
          {serverMessage?.content}
        </SyntaxHighlighter>
      </Skeleton>
    </Card>
  );
};

export default MessageItem;
