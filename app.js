require("babel-register")

const config = require ("./config")
const {success,error} = require('./function')
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true})) 

let membersRouter = express.Router()

//Creation d'une connexion avec la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'nodejstest'
})

db.connect((err)=>{
    if(err){
        console.log(err)//Affiche les erreur de connexion
    }else{
        console.log('Connexion à la base de données')

        membersRouter.route('/')
        .get((req,res)=>{
            if(req.query.max != undefined && req.query.max < 0){
                db.query("SELECT * FORM users LIMIT 0, ?", [req.query.max],(err,result)=>{
                    if(err){
                            res.json(error(err.message))
                    }else{
                        res.json(success(result))

                    }
                })
            }
        })

        app.use(config.routeAPI +' member ',membersRouter)

        app.listen(config.port,()=>{
            console.log("Commencer")
        })
    }
})