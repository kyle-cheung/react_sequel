import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { darcula as codeBlock } from "react-syntax-highlighter/dist/esm/styles/prism"

const History = ({ messages }) => {
  return (
    <ul className="list-none p-5 mt-3 border font-manrope bg-slate-50 bg-opacity-80 rounded-md">
      {messages.map((item, index) => (
        <li
          key={index}
          className={`mb-1 ${
            item.type === "user" ? "text-left" : "text-right"
          }`}
        >
          {item.type === "system" ? (
            <SyntaxHighlighter language="sql" style={codeBlock}>
              {item.content}
            </SyntaxHighlighter>
          ) : (
            <span
              className={`inline-block px-4 py-2 rounded bg-slate-200 text-blue-900`}
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
