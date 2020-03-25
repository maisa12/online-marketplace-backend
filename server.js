const express = require('express');
const cors = require('cors');
const app = express();
const {createUser, categoryArr, authorArr, createCategory, createAd} = require('./query');
const port = process.env.PORT || 8000;
app.use(cors());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('/add/category', jsonParser, async(req,res)=>{
  const response = await createCategory(req.body.name, req.body.position, req.body.slug);
    res.send(response)
    
  })
app.post('/add/user', jsonParser, async(req,res)=>{
    const {name, lastname, email, status, phoneNumber, password} = req.body;
   const response = await createUser(name+"%"+lastname, email, phoneNumber, status, password);
      res.send(response);
   })
   app.post('/add/ad', jsonParser, async(req,res)=>{
    const {name, author, category, description, picture, price, active} = req.body;
   const response = await createAd(name, author, category, description, picture, price, active);
      res.send(response);
   })
   app.get('/category', jsonParser, async(req,res)=>{
   const resp = await categoryArr();
      res.send(JSON.stringify(resp));
   })
   app.get('/authors', jsonParser, async(req,res)=>{
    const resp = await authorArr();
       res.send(JSON.stringify(resp));
    })
   
app.listen(port, ()=>console.log(`Server is listening: ${port}`))