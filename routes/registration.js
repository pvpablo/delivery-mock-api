var express = require('express');
var router = express.Router();
const pool = require('../database.js');

const INSERT_REGISTRY = `INSERT INTO REGISTRATION (government_id) VALUES ($1)`

router.post('/', function(req, res, next) {
  const government_id = req.body.government_id
//   const recaptcha = req.body.recaptcha_token

//TODO: add recaptcha validation
  
  pool.query(INSERT_REGISTRY, [government_id], (error, result) => {
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(201).send(`Registration successful: ${result.insertId}`)
      }
  })
})

router.get('/', function(req, res, next){
    res.status(200).send('Hello from the registration service')
})

module.exports = router;
