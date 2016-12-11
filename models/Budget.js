'use strict'

const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const Budget = new Schema({
  category: String,
  cost: Number
});

module.exports = mongoose.model('Budget', Budget);
