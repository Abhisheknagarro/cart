const route = require("express").Router();

route.use("/user", require("./user"));
route.use('/product', require('./product'))
route.use('/cart', require('./cart'))
route.use('/vender', require('./vender'))

exports = module.exports = {
  route
};
