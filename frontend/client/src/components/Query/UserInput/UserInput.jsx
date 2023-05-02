import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const UserInput = ({ onSubmit }) => {
  const [input, setInput] = useState("")

  const handleAction = e => {
    const isCtrlEnter = e.key === "Enter" && e.ctrlKey
    const isFormSubmit = e.type === "submit"

    if (isCtrlEnter || isFormSubmit) {
      e.preventDefault()
      onSubmit(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleAction}>
      <div className="relative w-full mt-4">
        <input
          value={input}
          placeholder="Ask your data..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleAction}
          className="resize-none overflow-y-auto p-3 pr-12 w-full border border-gray-300 rounded-lg bg-gray-200 font-manrope"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 mr-4 mt-3 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
        </button>
      </div>
    </form>
  )
}

export default UserInput
