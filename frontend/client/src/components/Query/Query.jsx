import React, { useState } from "react"
import axios from "axios"
import UserInput from "./UserInput/UserInput"
import History from "./History/History"

function Query() {
  const [messages, setMessages] = useState([])

  const handleUserInput = async input => {
    // Add user input to the message history
    setMessages(prevMessages => [
      ...prevMessages,
      { type: "user", content: input },
    ])

    try {
      const response = await axios.post("/server/query", { userInput: input })
      console.log(response.data.status)

      // Add system response to the message history
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "system", content: response.data.sql_query },
      ])
    } catch (error) {
      console.error("Error making API call: ", error)
    }
  }

  return (
    <div className="flex flex-col justify-center mx-40">
      <p className="text-4xl font-manrope font-bold text-cyan-950">
        Hello, Kyle
      </p>
      <UserInput onSubmit={handleUserInput} />
      <History messages={messages} />
    </div>
  )
}

export default Query
