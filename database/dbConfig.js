const knex = require('knex');

const knexConfig = require('../knexfile.js');

const dbEnv = 'production';

module.exports = knex(knexConfig[dbEnv]);