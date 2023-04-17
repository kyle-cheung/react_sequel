import { useState, useEffect } from 'react'
import Query from './components/Query/Query';
import Navbar from './components/Navbar/Navbar'


function App() {
  const [query, setQuery] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((query) => {
        setQuery(query);
        console.log(query);
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-stone-50 to-neutral-200">
        <Navbar />
        <Query />
      </div>
    </>
  )
}

export default App
