import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula as codeBlock } from "react-syntax-highlighter/dist/esm/styles/prism"
import {
  VStack,
  Box,
} from '@chakra-ui/react';

const SyntaxHighlighterDisplay = ({ messages = [] }) => {
  return (
    <VStack>
      {messages.map((item, index) => (
        <Box key={index}>
          {item.type === "system" ? (
            <SyntaxHighlighter
              className="rounded"
              language="sql"
              style={codeBlock}
            >
              {item.content}
            </SyntaxHighlighter>
          ) : (
            <Box>
              {item.content}
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  )
}

export default SyntaxHighlighterDisplay;