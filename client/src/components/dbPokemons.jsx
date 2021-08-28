import React from 'react';

let DBPokemons = ({ pokemons }) => {
  return (
    <div>
      <h2>POKEMONS IN DB</h2>
      {
        pokemons.map((pokemon, idx) => <div key={idx}>{pokemon.name}</div>)
      }
    </div>
  );
}

export default DBPokemons;