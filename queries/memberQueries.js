const ad = require('../models/ad');
const category = require('../models/category');
const user = require('../models/user');

let memberAds = async(userId) =>{

    const list = await ad.findAll({
        where: {
            author: userId 
        },
        raw: true,
        order: [['updatedAt', 'DESC']],
        include: [{ model: category, as: "categories",  attributes: ['name']}, {model: user, as: "users", attributes: [['name_lastname', 'author']]} ]
    })
    return list
}

let memberAdUpdate = async (name,  cat,  description, picture, price, id)=>{
    await ad.update({
        name: name, category: cat,  description: description, picture: picture, price: price}, 
     {
         where: {
             id: id
         }
     })
     return "success"
 }

 let memeberInfoUpdate = async (email, name, newEmail, phone)=>{
     if(email!==newEmail){
        const check = await user.findAll({
            raw:true, 
            where: {
                email: newEmail
        }
    })
    if(check.length===0){
        await user.update({
            name_lastname: name,
            email: newEmail,
            phone_number: phone,
        },
        {
            where: {
                email: email
            }
        })
        return "Updated"
    }
    else {
        return "მოცემული ელფოსტით მომხმარებელი უკვე დარეგისტრირებულია"
    }
     }
     else{
        await user.update({
            name_lastname: name,
            phone_number: phone,
        },
        {
            where: {
                email: email
            }
        })
        return "Updated"
     }
     
 };

 let changePassword = async (email, newPassword)=>{
       await user.update({
           password: newPassword,
       },
       {
           where: {
               email: email
           }
       })
       return "Updated"
    };

module.exports.changePassword = changePassword;
module.exports.memeberInfoUpdate = memeberInfoUpdate;
module.exports.memberAdUpdate = memberAdUpdate;
module.exports.memberAds = memberAds;