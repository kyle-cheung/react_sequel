import { useState, useEffect } from "react"
import Query from "./components/Query/Query"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const [query, setQuery] = useState(null)

  useEffect(() => {
    fetch("/server")
      .then(res => res.json())
      .then(query => {
        setQuery(query)
        console.log(query)
      })
  }, [])

  return (
    <>
      <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 h-screen">
        <Navbar />
        <Query />
      </div>
    </>
  )
}

export default App
