const express = require('express');
const cors = require('cors');
const app = express();
const {createCategory} = require('./query');
const {createUser} = require('./query');
const port = process.env.PORT || 8000;
app.use(cors());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('/add/category', jsonParser, async(req,res)=>{
  await createCategory(req.body.name, req.body.position, req.body.slug)
    res.send("success")
    console.log(req.body)
  })
app.post('/add/user', jsonParser, async(req,res)=>{
    const {name, lastname, email, status, phoneNumber, password} = req.body;
   const resp = await createUser(name+lastname, email, phoneNumber, status, password);
      res.send(resp)
   })
app.listen(port, ()=>console.log(`Server is listening: ${port}`))