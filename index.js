/***************************************
 * Environment variables
 ***************************************/
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

/************************************************
 * Express configuration :
 *    - static folder
 *    - body-parser json / urlencoded
 *    - middleware logging received requests
 *
 ************************************************/
const express = require('express');
const app = express();

app
  //  .use(express.static(__dirname+'/client/public'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    if (req.body) {
      console.log(req.method + ' ' + req.url + ' ' + JSON.stringify(req.body));
    } else {
      console.log(req.method + ' ' + req.url);
    }
    next();
  });

/**********************************************
 * Mongoose configuration :
 *    - ask Mongoose to use ES6 promises
 *    - connect to database
 *    - load models
 **********************************************/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once('open', () => console.log('Connected to database'))
  .on('error', (error) => console.warn('Error : ', error));

const kanji = mongoose.model(
  'kanji',
  new Schema({ kanji: String }, { collection: 'kanji' })
);

/****************************************************
 * Routing + REST API
 *    /           -> returns front page
 *    /res        -> returns all elements in res
 *    /res/id     -> returns single element in res
 *
 ****************************************************/
app.get('/', (req, res) => {
  res.status(200).end();
});

app.get('/kanjis', (req, res) => {
  kanji
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.error(err));
});

app.get('/kanjis/:kanji', (req, res) => {
  let filter = { kanji: req.params.kanji };

  kanji
    .findOne(filter)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.error(err));
});

app.post('/kanjis', (req, res) => {
  let newKanji = new kanji(req.body);

  newKanji
    .save()
    .then(() => res.status(200).end())
    .catch((err) => console.error(err));
});

app.put('/kanjis/:kanji', (req, res) => {
  let filter = { kanji: req.params.kanji };
  let update = req.body;

  kanji
    .findOneAndUpdate(filter, update)
    .then(() => res.status(200).end())
    .catch((err) => console.error(err));
});

app.delete('/kanjis/:kanji', (req, res) => {
  let filter = { kanji: req.params.kanji };

  kanji
    .findOneAndDelete(filter)
    .then(() => res.status(200).end())
    .catch((err) => console.error(err));
});

module.exports = app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
