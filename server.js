const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/kasdep-game-angular'));

app.get('/*', (req, res) => 
  res.sendFile('index.html', {root: 'dist/kasdep-game-angular'})
);

app.listen(process.env.PORT || 8080);