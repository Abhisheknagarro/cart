const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: __dirname + "/cart.db"
});

const User = db.define("users", {
  User_Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Vendor = db.define("vendors", {
  Vendor_Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Vendor_Name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Product = db.define("products", {
  Product_Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Product_Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Vendor_Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});
Product.belongsTo(Vendor, { foreignKey: "Vendor_Id", targetKey: "Vendor_Id", onDelete: 'CASCADE' });

const Cart = db.define("carts", {
  Cart_Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  User_Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Product_Id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});
Cart.belongsTo(Product, { foreignKey: "Product_Id", targetKey: "Product_Id", onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: "User_Id", targetKey: "User_Id", onDelete: 'CASCADE' });

db.sync()
  .then(() => console.log("Database has been synced"))
  .catch(err => console.error("Error creating database"));

exports = module.exports = {
  User: User,
  Product: Product,
  Cart: Cart,
  Vendor: Vendor,
  db: db
};
