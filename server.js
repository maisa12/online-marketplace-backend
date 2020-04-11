const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const {selectCategory, deleteItem, userUpdate, createUser, categoryArr, authorArr, createCategory, createAd, adList, catList, usersArr, adUpdate, catUpdate, mainList} = require('./query');
const port = process.env.PORT || 8000;
const passport = require('passport');
app.use(cors());

app.use(bodyParser.json());

app.post('/add/category', async(req,res)=>{
  const response = await createCategory(req.body.name, req.body.position, req.body.slug);
    res.send(response)
  })
app.post('/add/user', async(req,res)=>{
    const {name, lastname, email, status, phoneNumber, password} = req.body;
   const response = await createUser(name+"%"+lastname, email, phoneNumber, status, password);
      res.send(response);
   })
   app.post('/add/ad', async(req,res)=>{
      const {name, author, category, description, picture, price, active} = req.body;
      const response = await createAd(name, author, category, description, picture, price, active);
      res.send(response);
   })
   app.get('/category', async(req,res)=>{
      const resp = await categoryArr();
      res.send(JSON.stringify(resp));
   })
   app.get('/authors', async(req,res)=>{
      const resp = await authorArr();
      res.send(JSON.stringify(resp));
    })
   app.get('/ads', async(req,res)=>{
      const resp = await adList();
      res.send(JSON.stringify(resp));
      })
      app.get('/ads/:slug/:from/:to/:date', async(req,res)=>{
         const resp = await selectCategory(req.params.slug, req.params.from, req.params.to, req.params.date);
         res.send(JSON.stringify(resp));
         })
    app.get('/main/ads', async(req,res)=>{
         const resp = await mainList(req.params.slug);
         res.send(JSON.stringify(resp));
         })
   app.get('/categories', async(req,res)=>{
      const resp = await catList();
      res.send(JSON.stringify(resp));
      })
   app.get('/users', async(req,res)=>{
      const resp = await usersArr();
      res.send(JSON.stringify(resp));
         })
  
   app.put('/update/ad/:id', async(req,res)=>{
       const {name,  category,  description, picture, active, price}=req.body;
       await adUpdate(name,  category,  description, picture, active, price, req.params.id)
      res.send("success");
       })
   app.put('/update/category/:id', async(req,res)=>{
      const {name,  position,  slug, id} = req.body;
       await catUpdate(name,  position,  slug, id)
        res.send("success");
         })
    app.put('/update/user/:id', async(req,res)=>{
       const {name, lastname, email, status, phoneNumber, password, id} = req.body;
      const usUp = await userUpdate(name+"%"+lastname, email, phoneNumber, status, password, id);
       res.send(usUp);
               }) 
app.delete('/delete/:type/:id', async(req,res)=>{
   await deleteItem(req.params.type, req.params.id);
   res.send("deleted");
})
app.use(passport.initialize())
require('./passportConfig/passport');
require('./routes/findUser')(app);
require('./routes/register')(app);
require('./routes/login')(app);
app.listen(port, ()=>console.log(`Server is listening: ${port}`))