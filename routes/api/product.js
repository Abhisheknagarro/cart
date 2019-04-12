const Vendor = require("../../db").Vendor;
const Product = require("../../db").Product;
const route = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", (req, res) => {
  // Get all vendors
  Product.findAll({ include: [Vendor] })
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
          Vendor_Id: parseInt(req.body.product_vendor)
        }
      ]
    }
  })
    .then(products => {
      if (products.length == 0) {
        Product.create({
          Product_Name: req.body.product_name,
          Vendor_Id: parseInt(req.body.product_vendor),
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
  Vendor.findOne({
    where: { Vendor_Name: req.body.vendor_name }
  })
    .then(vendor => {
      Product.destroy({
        where: {
          [Op.and]: [
            {
              Product_Name: req.body.product_name,
              Vendor_Id: vendor.Vendor_Id
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
