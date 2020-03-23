const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
app.get('/',async(req,res)=>{
    res.send("hello world")
  })
app.use(cors());
app.listen(port, ()=>console.log(`Server is listening: ${port}`))