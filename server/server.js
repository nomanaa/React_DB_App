const express=require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

const db= require('./db2.js')

const app=express();

app.use(helmet())
app.use(compression())
app.use(cors());
app.use(bodyParser.json())

app.get('/task',(re,res)=>{
    const query= ' select * from Refree';
    db.all(query, (err,response)=>{
        res.send(response)
    })
})

app.get('/stadiumList',(re,res)=>{
    const query= ' select * from Stadium';
    db.all(query, (err,response)=>{
        res.send(response)
    })
})
app.get('/queryList',(re,res)=>{
    const query= ' SELECT Stadium_city FROM Match join Team on Match.AwayTeam_ID=Team.Team_Id where AwayTeam_goal>HomeTeam_goal and Team.Team_name="Liverpool"  order by Stadium_city';
    db.all(query, (err,response)=>{
        res.send(response)
    })
})


app.listen(4000,()=> {
    console.log('running on port 4000')
})