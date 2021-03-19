var express = require('express');
var router = express.Router();
const pool = require('../database.js');

const INSERT_PARCEL = `INSERT INTO PARCEL (parcel_height, parcel_weight, parcel_width) VALUES ($1, $2, $3) RETURNING parcel_id`
const INSERT_SHIPMENT = `INSERT INTO SHIPMENT (parcel_id, to_address, from_address, shipment_status) VALUES ($1, $2, $3, $4) RETURNING shipment_id`
const GET_SHIPMENT = `SELECT * FROM SHIPMENT WHERE shipment_id = $1`

router.post('/', function(req, res, next) {
  const parcel = {
    height: 10,
    width: 30,
    weight: 20
  }

  const shipment = {
    to_address: 'Montes Urales 445',
    from_address: 'Montes Urales 446',
    status: 'QUOTED'
  }
  
//   let uid = '';
//   const length = 18;
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//     uid += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
  
//   pool.query(INSERT_PARCEL, [parcel.height, parcel.weight, parcel.width], (error, result) => {
//       if (error) {
//         res.status(500).send(error)
//       } else {
//         res.status(201).send(`Parcel added with ID: ${result.rows[0].parcel_id}`)
//       }
//   })

    pool.query(INSERT_PARCEL, [parcel.height, parcel.weight, parcel.width])
    .then(result => {
        const parcel_id = result.rows[0].parcel_id
        return pool.query(INSERT_SHIPMENT, [parcel_id, shipment.to_address, shipment.from_address, shipment.status])
    }).then(result => {
        const shipment_id = result.rows[0].shipment_id
        res.status(201).send(`Shipment added with ID: ${shipment_id}`)
    }).catch(e => res.status(500).send(e.stack))
})

router.get('/', function(req, res, next) {
  pool.query(GET_SHIPMENT, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(results.rows)
  })
})

module.exports = router;
