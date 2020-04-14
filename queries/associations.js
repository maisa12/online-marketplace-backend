const ad = require('../models/ad');
const category = require('../models/category');
const user = require('../models/user');
user.hasMany(ad, {as: "ads", foreignKey:"author"});
ad.belongsTo(user, {as: 'users', foreignKey:"author"});
ad.belongsTo(category, {as: 'categories', foreignKey: 'category'});