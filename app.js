const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      console.log(user);
      req.user = user;
      console.log(req.user);
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* -------------------------------------------------------------------------- */
/*                            DATABASE ASSOCIATIONS                           */
/* -------------------------------------------------------------------------- */

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart);

CartItem.belongsTo(Cart, { constraints: true, onDelete: "CASCADE" });
Cart.hasMany(CartItem);

Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Order);

OrderItem.belongsTo(Order, { constraints: true, onDelete: "CASCADE" });
Order.hasMany(OrderItem);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// ! in production the force option in sync method MUST be removed!
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findOne({ where: { id: 1 } });
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Amir", email: "a@a.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000, () => console.log("server is running on http://localhost:3000"));
  })
  .catch((error) => console.log(error));
