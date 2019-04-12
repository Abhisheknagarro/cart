const Vender = require("../../db").Vender;
const Product = require("../../db").Product;
const route = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", (req, res) => {
  // Get all venders
  Product.findAll({ include: [Vender] })
    .then(products => {
      res.status(200).send(products);
    })
    .catch(err => {
      res.status(500).send({
        error: "Could not retrieve products"
      });
    });
});

route.post("/", (req, res) => {
  Product.findAll({
    where: {
      [Op.and]: [
        {
          Product_Name: req.body.product_name,
          Vender_Id: parseInt(req.body.product_vender)
        }
      ]
    }
  })
    .then(products => {
      if (products.length == 0) {
        Product.create({
          Product_Name: req.body.product_name,
          Vender_Id: parseInt(req.body.product_vender),
          Price: parseInt(req.body.product_price),
          Quantity: parseInt(req.body.product_qty)
        })
          .then(product => {
            res.status(201).send({ message: "product added" });
          })
          .catch(error => {
            res.status(501).send({
              error: "Error adding product"
            });
          });
      } else {
        res.status(201).send({ message: "product already exist" });
      }
    })
    .catch(error => {
      res.status(501).send({
        error: "Error adding product"
      });
    });
});

route.delete("/", (req, res) => {
  Vender.findOne({
    where: { Vender_Name: req.body.vender_name }
  })
    .then(vender => {
      Product.destroy({
        where: {
          [Op.and]: [
            {
              Product_Name: req.body.product_name,
              Vender_Id: vender.Vender_Id
            }
          ]
        }
      })
        .then(() => {
          res.status(201).send({ message: "deleted" });
        })
        .catch(error => {
          res.status(501).send({
            error: "Error deleting product"
          });
        });
    })
    .catch(error => {
      res.status(501).send({
        error: "Error deleting product"
      });
    });
});

exports = module.exports = route;
