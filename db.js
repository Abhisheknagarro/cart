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

const Vender = db.define("venders", {
  Vender_Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Vender_Name: {
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
  Vender_Id: {
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
Product.belongsTo(Vender, { foreignKey: "Vender_Id", targetKey: "Vender_Id", onDelete: 'CASCADE' });
Vender.hasMany(Product);

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
Product.hasMany(Cart);
User.hasMany(Cart)
db.sync()
  .then(() => console.log("Database has been synced"))
  .catch(err => console.error("Error creating database"));

exports = module.exports = {
  User: User,
  Product: Product,
  Cart: Cart,
  Vender: Vender,
  db: db
};
