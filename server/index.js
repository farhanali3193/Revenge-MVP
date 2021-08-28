const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');
const db = require('../db/index.js');

const port = 3000;
const servingPath = path.join(__dirname, '/../client/dist');
app.use(express.static(servingPath));
app.use(bodyParser.json());

app.get('/pokemons', (req, res) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
  .then((resp) => {
    console.log('RESPONSE FROM API', resp.data)
    res.status(200).send(resp.data.results)
  })
  .catch((err) => {
    console.log('ERROR GETTING POKEMONS FROM API')
    throw err;
  })
})

app.get('/pokemonsDB', (req, res) => {
  return db.getAll()
    .then((pokemons) => {
      console.log('POKEMONS FROM DB', pokemons);
      res.status(200).send(pokemons);
    })
    .catch((err) => {
      console.log('ERROR GETTING POKEMONS FROM DB')
      throw err;
    })
})

app.post('/pokemon', (req, res) => {
  console.log('body', req.body)
  return db.findOne(req.body.name)
    .then((foundPokemons) => {
      if (foundPokemons.length > 0) {
        res.status(204).send('POKEMON ALREADY EXISTS');
      } else {
          return db.addOne(req.body)
          .then((addedPokemon) => {
            console.log('SERVER ADDED POKEMON', addedPokemon);
            res.status(201).send('Added');
          })
          .catch((err) => {
            console.log('ERROR ADDING POKEMONS IN SERVER');
            throw err;
          })
      }
    })
    .catch((err) => {
      console.log('ERROR FINDING POKEMON IN SERVER');
      throw err;
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}, Serving on http://localhost:${port}`);
})