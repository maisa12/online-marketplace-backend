const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const {selectCategory, categoryArr, mainList, selectAd} = require('./queries/guestQueries');
const port = process.env.PORT || 8000;
const passport = require('passport');
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
require('./passportConfig/passport');
require('./queries/associations');
//Guest requests
app.get('/ads/:slug/:from/:to/:date/:offset', async(req,res)=>{
         const resp = await selectCategory(req.params.slug, req.params.from, req.params.to, req.params.date, req.params.offset);
         res.send(JSON.stringify(resp));
         })
app.get('/main/ads', async(req,res)=>{
         const resp = await mainList(req.params.slug);
         res.send(JSON.stringify(resp));
         })
app.get('/ad/:id', async(req,res)=>{
            const resp = await selectAd(req.params.id);
            res.send(JSON.stringify(resp));
            })
app.get('/category', async(req,res)=>{
         const resp = await categoryArr();
         res.send(JSON.stringify(resp));
    
      })
//Admin's requests
require('./routes/adminRoutes/addAd')(app);
require('./routes/adminRoutes/addCategory')(app);
require('./routes/adminRoutes/addUser')(app);
require('./routes/adminRoutes/deleteItem')(app);
require('./routes/adminRoutes/getAds')(app);
require('./routes/adminRoutes/getAuthors')(app);
require('./routes/adminRoutes/getUsers')(app);
require('./routes/adminRoutes/updateAd')(app);
require('./routes/adminRoutes/updateCategory')(app);
require('./routes/adminRoutes/updateUser')(app);
//Authorization
require('./routes/findUser')(app);
require('./routes/register')(app);
require('./routes/login')(app);
//Member's requests
require('./routes/memberRoutes/getAds')(app);
require('./routes/memberRoutes/getUsersInfo')(app);
require('./routes/memberRoutes/newAd')(app);
require('./routes/memberRoutes/updateAd')(app);
require('./routes/memberRoutes/deleteAd')(app);
require('./routes/memberRoutes/updateInfo')(app);
require('./routes/memberRoutes/updatePassword')(app);
app.listen(port, ()=>console.log(`Server is listening: ${port}`))