const ad = require('./models/ad');
const category = require('./models/category')
const user = require('./models/user')
category.hasMany(ad, {as: "ads", foreignKey:"category"});
ad.belongsTo(category, {as: "categories", foreignKey: "category"});

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
const checkCreation = await ad.findAll({where:{
    name: name,
    author: author,
    category: category,
    description: description,
    picture: picture,
    price: price,
    active: active
}, raw: true, attributes: ['id']}); 
   if(checkCreation.length!==0){
       return true
   }
   else{
      return false
   }
}
let createCategory = async function(name, position, slug){
    const checkPosition = await category.findAll({where:{position: position}, raw: true, attributes: ['id']});
    const checkSlug = await category.findAll({where:{slug: slug}, raw: true, attributes: ['id']});
    if(checkPosition.length!==0 && checkSlug.length!==0){
        return "both"
    }
    if(checkPosition.length!==0){
        return "position"
    }
    if(checkSlug.length!==0){
        return "slug"
    }
    await category.create({
       name: name,
       position: position,
       slug: slug,
   })
   return "success"
}
let createUser = async function(name, email, phone, status, password){
    const checkEmail = await user.findAll({where:{email: email}, raw: true, attributes: ['id']});
    console.log(checkEmail.length) 
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
       return true
   }
   else{
      return false
   }
}
else{
    return false
}
}
let categoryArr = async()=>{
   const categoryArray = await category.findAll({raw: true, attributes: ['name', 'position', 'slug', 'id']});
   return categoryArray
}
let authorArr = async()=>{
    const authorArray = await user.findAll({raw: true, attributes: ['name_lastname', 'id']});
    return authorArray
 }
 let adList = async()=>{
const list =  await ad.findAll({
    raw: true,
    include:[{ model: category, as: "categories", attributes: ['name']}],})
                        .catch(e=>console.log(e));
    return list
 }
 let catList =async ()=>{
    const categoryList = await category.findAll({raw:true, attributes: ['name', 'position', 'slug']})
   return categoryList
 }
 let usersArr = async()=>{
    const usersArray = await user.findAll({raw: true, attributes: [['name_lastname', 'name'], 'id', 'status', 'email', ['phone_number', 'number']]});
    return usersArray
 }
module.exports.createAd = createAd;
module.exports.createCategory = createCategory;
module.exports.createUser = createUser;
module.exports.categoryArr = categoryArr;
module.exports.authorArr = authorArr;
module.exports.adList = adList;
module.exports.catList = catList;
module.exports.usersArr = usersArr;