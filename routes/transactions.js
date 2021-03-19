const express = require('express');
const router = express.Router();
const pool = require('../database.js');

const INSERT_TRANSACTION = `INSERT INTO TRANSACTION(rate_id) VALUES ($1) RETURNING transaction_id`;

router.post('/', async (req, res, next) => {
  const rateId = req.body.rateId;

  const results = await pool.query(INSERT_TRANSACTION, [rateId]);

  return res.status(201).send(results.rows);
});

module.exports = router;
