const express = require('express');
const router = express.Router();
const pool = require('../database.js');

const INSERT_PARCEL = `INSERT INTO PARCEL (parcel_height, parcel_weight, parcel_width) VALUES ($1, $2, $3) RETURNING parcel_id`;
const INSERT_SHIPMENT = `INSERT INTO SHIPMENT (parcel_id, to_address, from_address, shipment_status) VALUES ($1, $2, $3, $4) RETURNING shipment_id`;
const INSERT_RATES = `INSERT INTO RATES (shipment_id, provider_id, rate) VALUES ($1, $2, $3) RETURNING rate_id`;
const GET_SHIPMENT = `SELECT * FROM SHIPMENT WHERE shipment_id = $1`;
const GET_PROVIDERS = `SELECT * FROM DELIVERY_PROVIDER`;

router.post('/', function (req, res, next) {
  const payload = req.body;

  pool.query(INSERT_PARCEL, 
             [payload.parcel.height, 
              payload.parcel.weight, 
              payload.parcel.width])
    .then(result => {
      const parcel_id = result.rows[0].parcel_id

      return pool.query(INSERT_SHIPMENT, 
                        [parcel_id, 
                         payload.shipment.to_address, 
                         payload.shipment.from_address, 
                         payload.shipment.status])
    }).then(result => {
        return result.rows[0].shipment_id
    }).then(async (shipment_id) => {
      const providers = await pool.query(GET_PROVIDERS);
      const rates = providers.rows.map(provider => {
        return Object.assign(provider, {rate: Math.floor(Math.random() * 21)});
      });

      for (rate of rates) {
        const rate_id = await pool.query(INSERT_RATES, [shipment_id, rate.provider_id, rate.rate]);
      }

      return res.json({shipment_id, rates});
    }).catch(e => res.status(500).send(e.stack));
});

router.get('/:shipment_id', function(req, res, next) {
  pool.query(GET_SHIPMENT, [req.params.shipment_id])
    .then(result => {
      return res.status(200).send(result.rows)
    }).catch(e => res.status(500).send(e.stack));
});

module.exports = router;

