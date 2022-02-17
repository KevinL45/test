require("babel-register")

const config = require ("./config")
const {success,error} = require('./function')
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true})) 