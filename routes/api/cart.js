const Cart = require("../../db").Cart;
const Vendor = require("../../db").Vendor;
const Product = require("../../db").Product;
const route = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

route.get("/", (req, res) => {
  // Get all vendors
  Cart.findAll({
    where: {
      User_Id: parseInt(req.query.user_id)
    },
    include: [
      { model: Product },
      { model: Product, include: [{ model: Vendor }] }
    ]
  })
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
  Cart.findAll({
    where: {
      [Op.and]: [
        {
          Product_Id: parseInt(req.body.product_id),
          User_Id: parseInt(req.body.user_id)
        }
      ]
    }
  })
    .then(items => {
      if (items.length == 0) {
        Cart.create({
          User_Id: parseInt(req.body.user_id),
          Product_Id: parseInt(req.body.product_id),
          Quantity: 1
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
        Cart.update(
          {
            Quantity: Sequelize.literal("Quantity + 1")
          },
          {
            where: {
              [Op.and]: [
                {
                  Product_Id: parseInt(req.body.product_id),
                  User_Id: parseInt(req.body.user_id)
                }
              ]
            }
          }
        );
        res.status(201).send({ message: "product added" });
      }
    })
    .catch(error => {
      res.status(501).send({
        error: "Error adding product"
      });
    });
});

route.delete("/", (req, res) => {
  Cart.destroy({
    where: {
      [Op.and]: [
        {
          Product_Id: parseInt(req.body.product_id),
          User_Id: parseInt(req.body.user_id)
        }
      ]
    }
  }).then(() => {
      res.status(201).send({ message: "deleted" });
    })
    .catch(error => {
      res.status(501).send({
        error: "Error deleting cart"
      });
    });
});

exports = module.exports = route;
