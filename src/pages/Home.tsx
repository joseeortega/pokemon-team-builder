import { useEffect, useState } from 'react'
import { getPokemons } from '../services/PokeApi'

function Home() {
  const [pokemons, setPokemons] = useState([])

  const entryStyle = {
  }

  useEffect(() => {
    getPokemons({limit: 10, offset: 0}).then((pokemons) => {
      debugger;
      setPokemons(pokemons)
    })
  }, [])

  return (
    <div id="Home" style={entryStyle}>
      <div>
      <h1>Pokemon Team Builder</h1>
      <p>Create your own Pokemon Team easily selecting your favourite competitive Pokemon!</p>
      </div>
      <div>
        Pokemon total length: {pokemons.length}
      </div>
      
    </div>
  )
}

export default Home
