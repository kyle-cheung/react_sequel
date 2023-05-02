import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula as codeBlock } from "react-syntax-highlighter/dist/esm/styles/prism"

const History = ({ messages }) => {
  return (
    <ul className="list-none p-5 mt-3 border font-manrope bg-slate-50 bg-opacity-90 rounded-md">
      {messages.map((item, index) => (
        <li
          key={index}
          className={`mb-1 ${
            item.type === "user" ? "text-left" : "text-right"
          }`}
        >
          {item.type === "system" ? (
            <SyntaxHighlighter
              className="rounded"
              language="sql"
              style={codeBlock}
            >
              {item.content}
            </SyntaxHighlighter>
          ) : (
            <span
              className={`inline-block px-4 py-2 mb-1 rounded bg-slate-600 text-slate-200`}
            >
              {item.content}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default History
