'use strict'
const dotenv = require('dotenv');
const assert = require('assert');
dotenv.config();
let envIsCodescape = false;
const HOST_URL = envIsCodescape ? "https://cuddly-guacamole-ggwvpwjwv52wr94-8080.app.github.dev" : "http://localhost:8080"
const {
    PORT,
    HOST,
    MONGODB_URI,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    dburi: MONGODB_URI
}