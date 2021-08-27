const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const port = 3000;
const servingPath = path.join(__dirname, '/../client/dist');
app.use(express.static(servingPath));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}, Serving on http://localhost:${port}`);
})