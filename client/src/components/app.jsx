import React from 'react';
import Search from './search.jsx';
import SearchResults from './searchResults.jsx';
import DBPokemons from './dbPokemons.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      dbPokemons: []
    }
  }

  onSearch = (term) => {
    // console.log('term', term)
    let filteredPokemons = this.state.pokemons.filter((pokemon) => pokemon.name.includes(term));
    // console.log('FILTERED POKEMONS', filteredPokemons);
    this.setState({filteredPokemons}, () => console.log('STATE AFTER FILTERTING POKEMONS', this.state))
  }

  onClick = (pokemon) => {
    console.log('CLICKED', pokemon)
    fetch(`/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then((resp) => {
      console.log('RESP', resp.statusText)
      return this.getPokemonsFromDB()
    })
    .catch((err) => {
      console.log('ERROR ADDING POKEMON TO SERVER')
      throw err;
    })
  }

  getPokemonsFromAPI = () => {
    return fetch('/pokemons')
    .then((resp) => resp.json())
    .then((pokemons) => {
      // console.log('pokemons', pokemons)
      this.setState({pokemons}, () => console.log('POKEMONS FRM API', this.state))
    })
    .catch((err) => {
      console.log('ERROR GETTING POKEMONS FROM SERVER')
      throw err;
    })
  }

  getPokemonsFromDB = () => {
    return fetch(`/pokemonsDB`)
    .then((resp) => resp.json())
    .then((dbPokemons) => {
      // console.log('DB POKEMONS', pokemons);
      this.setState({dbPokemons}, () => console.log('POKEMONS FRM DB', this.state))
    })
    .catch((err) => {
      console.log('ERROR GETTING POKEMONS FROM SERVER')
      throw err;
    })
  }

  componentDidMount () {
    this.getPokemonsFromAPI()
      .then(this.getPokemonsFromDB);
  }

  render () {
    return (
      <div className='main'>
        <h2>POKEDEX</h2>
        <Search onSearch={this.onSearch}/>
        <h2>SEARCH RESULTS</h2>
        {
          this.state.filteredPokemons.length > 0 ?
          <SearchResults filteredPokemons={this.state.filteredPokemons} onClick={this.onClick}/> :
          null
        }
        <DBPokemons pokemons={this.state.dbPokemons}/>
      </div>
    )
  };
}

export default App;