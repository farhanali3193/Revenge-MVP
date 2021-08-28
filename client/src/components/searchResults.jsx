import React from 'react';
import Pokemon from './pokemon.jsx';

let SearchResults = ({ filteredPokemons, onClick }) => {
  return (
    <div>
      {
        filteredPokemons.map((pokemon, idx) => <Pokemon key={idx} pokemon={pokemon} onClick={onClick}/>)
      }
    </div>
  )
}

export default SearchResults;