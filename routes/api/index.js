const route = require("express").Router();

route.use("/user", require("./user"));
route.use('/product', require('./product'))
route.use('/cart', require('./cart'))
route.use('/vendor', require('./vendor'))

exports = module.exports = {
  route
};
