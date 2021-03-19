var express = require('express');
var router = express.Router();
const pool = require('../database.js');

const INSERT_CITIZEN = `INSERT INTO CITIZEN (government_id, firstname, lastname, birthdate, biological_sex, nationality) 
  VALUES ($1, $2, $3, $4, $5 $6)`
const GET_CITIZENS = `SELECT * FROM CITIZEN`

router.post('/', function(req, res, next) {
  // Generate a new random ID to insert in the DB. 
  // You would typically invoke an existing service passing the government_id as a parameter to return the citizen information
  let uid = '';
  const length = 18;
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    uid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  pool.query(INSERT_CITIZEN, [uid, 'Mary Ann', 'Wilters', '1975-05-05', '1', 'American'], (error, result) => {
      if (error) {
        res.status(500).send(error)
      }
      res.status(201).send(`Citizen added with ID: ${result.insertId}`)
  })
})

router.get('/', function(req, res, next) {
  pool.query(GET_CITIZENS, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(results.rows)
  })
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   const userList = ['123', '456']
//   res.send(userList);
// })

// router.put('/:id', function(req, res, next) {
//   res.send(`updated user ${req.params.id}`)
// })

// router.delete('/:id', function(req, res, next) {
//   res.send(`deleted user ${req.params.id}`)
// })

module.exports = router;
