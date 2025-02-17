let express = require('express');
let app = express();

let bodyParser = require('body-parser');

// app.get('/', (req, res) => res.send('Hello Express'));

const pathAbsolute = (path) => __dirname + path;

// Simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(pathAbsolute('/public')));
app.use('/public', express.static(pathAbsolute('/public')));

app.get('/', (req, res) => {
  res.sendFile(pathAbsolute('/views/index.html'));
});

app.get('/json', (req, res) => {
  res.json(process.env.MESSAGE_STYLE === 'uppercase' ? {
      "message": "HELLO JSON"
    } : {
      "message": "Hello json"
  });
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    time: req.time
  });
});

app.get('/:word/echo', (req, res) => {
  res.json({
    echo: req.params.word
  });
});

app.route('/name')
  .get((req, res) => {
    res.json({
      name: `${req.query.first} ${req.query.last}`
    });
}).post((req, res) => {
    res.json({
      name: `${req.body.first} ${req.body.last}`
    });
});




































module.exports = app;
