const ad = require('../models/ad');
const category = require('../models/category');
const user = require('../models/user');
const {Op} = require('sequelize');
let categoryArr = async()=>{
    const categoryArray = await category.findAll({raw: true, attributes: ['name', 'position', 'slug', 'id']});
    return categoryArray
 }
 
 let main = async(slug)=>{   
         const list = await ad.findAll({
             where:{
                 category:slug,
                 active: true
             },
             raw: true,
             limit: 3,
             order: [['updatedAt', 'DESC']],
             include: [{ model: category, as: "categories",  attributes: ['name']}, {model: user, as: "users", attributes: [['name_lastname', 'author']]} ]
         })
         return list
 }
 let mainList =async()=>{
     let adsArray = [];
     const categoryList =await categoryArr();
     for(let item of categoryList){
       const request = await main(item.slug);
       adsArray = adsArray.concat(request)
     }
 
     return adsArray
 }
 let selectCategory = async(slug, from, to, dateBl)=>{ 
     var date = new Date(Date.now()); 
     var priceTo ={
         [Op.gte]: from
     };
     var dt = {
         [Op.lte]: date
     };
     if(dateBl==="true"){
         date.setDate(date.getDate()-7);
         dt = {
             [Op.gte]: date 
         }; 
     }
     if(to!=='0'){
         priceTo={
                 [Op.gte]: from,
                 [Op.lte]: to
             }
         
     }
     const list = await ad.findAll({
         where:{
             category:slug,
             active: true,
             price: priceTo,
             updatedAt: dt
         },
         raw: true,
         order: [['updatedAt', 'DESC']],
         include: [{ model: category, as: "categories",  attributes: ['name']}, {model: user, as: "users", attributes: [['name_lastname', 'author']]} ]
     })
     return list
 }
 module.exports.categoryArr = categoryArr;
 module.exports.mainList = mainList;
 module.exports.selectCategory = selectCategory; 