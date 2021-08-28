import React from 'react';

let Pokemon = ({ pokemon, onClick }) => {
  let handleClick = () => {
    onClick({name: pokemon.name, url: pokemon.url})
  }

  return (
    <div onClick={handleClick}>
      {pokemon.name}
    </div>
  )
};

export default Pokemon;