const ad = require('../models/ad');
const category = require('../models/category');
const user = require('../models/user');
let createAd = async function(name, author, category, description, picture, price, active){
    await ad.create({
       name: name,
       author: author,
       category: category,
       description: description,
       picture: picture,
       price: price,
       active: active
   })
const checkCreation = await ad.findAll(
    {
        where:{
                    name: name,
                    author: author,
                    category: category,
                    description: description,
                    picture: picture,
                    price: price,
                    active: active
            }, raw: true, 
            attributes: ['id']
        }); 
if(checkCreation.length!==0){
  return "success"
}
else{
 return "სიახლის დამატება ვერ მოხერხდა"
}
}
let createCategory = async function(name, position, slug){
const checkPosition = await category.findAll(
    {
        where:{position: position}, 
        raw: true, 
        attributes: ['id']
    });
const checkSlug = await category.findAll(
    {
        where:{
            slug: slug
        }, 
        raw: true, 
        attributes: ['id']
    });
if(checkPosition.length!==0 && checkSlug.length!==0){
   return "Slug და პოზიცია დაკავებულია"
}
if(checkPosition.length!==0){
   return "პოზიცია დაკავებულია"
}
if(checkSlug.length!==0){
   return "Slug დაკავებულია"
}
await category.create({
  name: name,
  position: position,
  slug: slug,
})
return "success"
}
let createUser = async function(name, email, phone, status, password){
const checkEmail = await user.findAll(
    {
    where:{
        email: email
    }, raw: true, 
    attributes: ['id']
});

if(checkEmail.length===0){
const newuser = await user.create({
   name_lastname: name,
   email: email,
   phone_number: phone,
   status: status,
   password: password
});
const checkCreation = await user.findAll({where:{email: email}, raw: true, attributes: ['id']}); 
if(checkCreation.length!==0){
  return "success"
}
else{
 return "მომხმარებლის დამატება ვერ მოხერხდა"
}
}
else{
return "მოცემული ელ-ფოსტით მომხმარებელი უკვე დარეგისტრირებულია"
}
}
let authorArr = async()=>{
    const authorArray = await user.findAll({raw: true, attributes: ['name_lastname', 'id']});
    return authorArray
 }
 let adList = async()=>{
    const list = await ad.findAll({
        raw:true,
        include: [{ model: category, as: "categories",  attributes: ['name']}, {model: user, as: "users", attributes: [['name_lastname', 'author']]} ]
    })
    return list
 }
 
 let usersArr = async()=>{
    const usersArray = await user.findAll({raw: true, attributes: [['name_lastname', 'name'], 'id', 'status', 'email', ['phone_number', 'number']]});
    return usersArray
 }
let adUpdate = async (name,  cat,  description, picture, active, price, id)=>{
   await ad.update({
       name: name, category: cat,  description: description, picture: picture, active: active, price: price}, 
    {
        where: {
            id: id
        }
    })
    return "success"
}
let catUpdate = async (name,  position,  slug, id)=>{
    await category.update({name: name, position: position,  slug: slug}, {where: {id: id}})
    return "success"
 }
let userUpdate = async (name, email, phone, status, password, id)=>{
    const check= await user.findAll({where:{email: email}, raw: true, attributes: ['email', 'id']});
    if(check[0].id===id && password.length===0){
            await user.update({
                name_lastname: name,
                email: email,
                phone_number: phone,
                status: status
                }, {where: {id: id}})
                return "success"
    }
    else if(check[0].id===id && password.length!==0){
        await user.update({
            name_lastname: name,
            email: email,
            phone_number: phone,
            status: status,
            password: password
            }, {where: {id: id}})
            return "success"
    }
    else{
        return "მოცემული ელ-ფოსტით მომხმარებელი უკვე დარეგისტრირებულია"
    }
  
 }
 let deleteItem = async(type, id)=>{
     if(type==="ad"){
        await ad.destroy({
            where:{
                id: id
            }})
     }
     if(type==="category"){
        await category.destroy({
            where:{
                id: id
            }})
     }
     if(type==="user"){
        await user.destroy({
            where:{
                id: id
            }})
     }
    
 }
module.exports.authorArr = authorArr;
module.exports.adList = adList;
module.exports.usersArr = usersArr;
module.exports.adUpdate = adUpdate;
module.exports.catUpdate = catUpdate;
module.exports.userUpdate = userUpdate;
module.exports.deleteItem = deleteItem;
module.exports.createAd = createAd;
module.exports.createCategory = createCategory;
module.exports.createUser = createUser;