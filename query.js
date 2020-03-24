const ad = require('./models/ad');
const category = require('./models/category')
const user = require('./models/user')
let createAd = async function(name, category, description, picture, price){
         await ad.create({
            name: name,
            author: "admin",
            category: category,
            description: description,
            picture: picture,
            price: price
        })
}
let createCategory = async function(name, position, slug){
    await category.create({
       name: name,
       position: position,
       slug: slug,
   })
}
let createUser = async function(name, email, phone, status, password){
   
    const checkEmail = await user.findAll({where:{email: email}, raw: true, attributes: ['id']});
    if(checkEmail.length===0){
    await user.create({
        name_lastname: name,
        email: email,
        phone_number: phone,
        status: status,
        password: password
   })
   return true
}
else{
    return false
}

}
module.exports.createAd = createAd;
module.exports.createCategory = createCategory;
module.exports.createUser = createUser;