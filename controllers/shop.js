const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => console.error(error));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.error(error));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.error(error));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products,
          });
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

exports.postCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: req.body.productId } });
    })
    .then((product) => {
      if (product.length > 0) {
        req.user.getCart().then((cart) => {
          CartItem.update(
            { quantity: product[0].CartItem.quantity + 1 },
            { where: { productId: req.body.productId, cartId: cart.id }, fields: ["quantity"] }
          );
        });
      } else {
        Product.findOne({ where: { id: req.body.productId } })
          .then((product) => {
            req.user.getCart().then((cart) => {
              cart.addProduct(product, { through: { quantity: 1 } });
            });
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: req.body.productId } });
    })
    .then((products) => {
      return products[0].CartItem.destroy();
    })
    .then((result) => res.redirect("/cart"))
    .catch((error) => {
      console.error(error);
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
