import { useState, useEffect } from "react"
import Query from "./components/Query/Query"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <>
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-600 to-gray-900 h-screen">
        <Navbar />
        <Query />
      </div>
    </>
  )
}

export default App
