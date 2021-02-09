var express = require('express');
var router = express.Router();
const pool = require('../database.js');

const INSERT_REGISTRY = `INSERT INTO REGISTRATION (government_id, contact_number, 
    email, residence_city) VALUES ($1, $2, $3, $4) RETURNING registration_id`

router.post('/', function(req, res, next) {
  const government_id = req.body.government_id
  const contact_number = req.body.contact_number
  const email = req.body.email
  const residence_city = req.body.residence_city
//   const recaptcha = req.body.recaptcha_token

//TODO: add recaptcha validation
  
  pool.query(INSERT_REGISTRY, [government_id, contact_number, email, residence_city], (error, result) => {
      if (error) {
        res.status(500).send(error)
      } else {
        res.status(201).send(`Registration successful: ${result.rows[0].registration_id}`)
      }
  })
})

router.get('/', function(req, res, next){
    res.status(200).send('Hello from the registration service')
})

module.exports = router;
