const { Client } = require('pg');
const database = 'revenge'
const client = new Client({
  database
});

client.connect()
  .then((client) => {
    console.log(`CONNECTED TO PG: DATABASE: ${database}`);
  })
  .catch((err) => console.log(`ERROR CONNECTING TO PG: DATABASE ${database}`, err))

let getAll = () => {
  let query = `SELECT * FROM pokemons`;
  return client.query(query)
    .then((data) => {
      console.log('DB POKEMONS', data)
      return data.rows;
    })
    .catch((err) => {
      console.log('ERROR GETTING POKEMONS FROM DB');
      throw err;
    })
}

let addOne = ({name, url}) => {
  let query = `INSERT INTO pokemons (name, url) VALUES ($1, $2)`;
  let values = [name, url];
  return client.query(query, values)
    .then((data) => {
      // console.log('DB ADDED POKEMON', data)
      return 'ADDED IN DB'
    })
    .catch((err) => {
      console.log('ERROR ADDING POKEMON TO DB');
      throw err;
    })
}

let findOne = (name) => {
  let query = `SELECT * FROM pokemons WHERE name=$1`;
  let values = [name];
  return client.query(query, values)
    .then((data) => {
      console.log('DATA', data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log('ERROR FINDING POKEMON IN DB');
      throw err;
    })
}

module.exports.getAll = getAll;
module.exports.addOne = addOne;
module.exports.findOne = findOne;