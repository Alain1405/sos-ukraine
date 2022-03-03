const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.post('/submitLocation', function(req, res) {
  console.log(req.body);
  res.send('We will try to contact you shortly')
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
