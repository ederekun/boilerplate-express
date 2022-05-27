let express = require('express');
let app = express();

// app.get('/', (req, res) => res.send('Hello Express'));

const pathAbsolute = (path) => __dirname + path;

// Simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

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






































module.exports = app;
