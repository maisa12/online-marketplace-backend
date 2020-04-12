const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const {selectCategory, categoryArr, mainList} = require('./query');
const port = process.env.PORT || 8000;
const passport = require('passport');
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
require('./passportConfig/passport');
//Guest requests
app.get('/ads/:slug/:from/:to/:date', async(req,res)=>{
         const resp = await selectCategory(req.params.slug, req.params.from, req.params.to, req.params.date);
         res.send(JSON.stringify(resp));
         })
app.get('/main/ads', async(req,res)=>{
         const resp = await mainList(req.params.slug);
         res.send(JSON.stringify(resp));
         })
app.get('/category', async(req,res)=>{
         const resp = await categoryArr();
         res.send(JSON.stringify(resp));
    
      })
//Admin requests
require('./routes/adminRoutes/addAd')(app);
require('./routes/adminRoutes/addCategory')(app);
require('./routes/adminRoutes/addUser')(app);
require('./routes/adminRoutes/deleteItem')(app);
require('./routes/adminRoutes/getAds')(app);
require('./routes/adminRoutes/getAuthors')(app);
require('./routes/adminRoutes/getCategories')(app);
require('./routes/adminRoutes/getUsers')(app);
require('./routes/adminRoutes/updateAd')(app);
require('./routes/adminRoutes/updateCategory')(app);
require('./routes/adminRoutes/updateUser')(app);
//Authorization
require('./routes/findUser')(app);
require('./routes/register')(app);
require('./routes/login')(app);
//Member requests
require('./routes/memberRoutes/getAds')(app);
require('./routes/memberRoutes/getUsersInfo')(app);
app.listen(port, ()=>console.log(`Server is listening: ${port}`))