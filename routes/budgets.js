'use strict'

'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Budget = require('../models/Budget');

router.get('/', (req,res)=>{
  Budget.find( (err,budgets) =>{
    res.json(budgets);
  })
})

router.get('/:id', (req,res) => {
  Budget.findById( req.params.id, (err,budget)=>{
    res.json(budget);
  })
})

router.post('/', (req,res) =>{
  let { category, cost } = req.body;
  new Budget({
    category,
    cost
  }).save( (err,budget) =>{
    res.json(budget);
  });
});

module.exports = router;
