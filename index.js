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
  .use(express.urlencoded({extended: false}))
  .use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
  })









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

app.get('/:resource', (req, res) => {
  
  kanjis = [];
  // fetch MondoDB resource
  res.status(200).send(kanjis);
});


module.exports = app.listen(PORT, () => {
  console.log('Listening on port '+PORT);
})