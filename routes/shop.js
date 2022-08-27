/* 
    This file is used to handle all shop routes.
    Controller methods are stored in the ../controllers/shop.js file.
    Shop actions include:
        - listing all products
        - listing a single product
        - adding a product to the cart
        - deleting a product from the cart
        - updating the quantity of a product in the cart
        - checking out the cart
        - getting the cart
        - create an order
        - getting the orders
        - deleting an order

    TODO:
        - add a route to get the orders for a specific user
        
*/

const express = require("express");

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /shop/products => GET
// This route is used to get all the products in the shop.
router.get("/", shopController.getIndex);

// /shop/products => GET
// This route is used to get all the products in the shop.
router.get("/products", shopController.getProducts);

// /shop/products/:productId => GET
// This route is used to get a single product in the shop.
router.get("/products/:productId", shopController.getProduct);

// /shop/cart => GET
// This route is used to get the cart for the current user.
router.get("/cart", isAuth, shopController.getCart);

// /shop/cart => POST
// This route is used to add a product to the cart for the current user.
router.post("/cart", isAuth, shopController.postCart);

// /shop/cart => DELETE
// This route is used to delete a product from the cart for the current user.
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

// /shop/cart => POST
// This route is used to 
// 1. update the quantity of a product
// 2. delete a product from the cart
// 3. check out the cart
// 4. update the quantity of a product in the cart
// in the cart for the current user.
router.post("/create-order", isAuth, shopController.postOrder);

// /shop/orders => GET
// This route is used to get all the orders for the current user.
router.get("/orders", isAuth, shopController.getOrders);

// /shop/orders => DELETE
// This route is used to delete an order for the current user.
router.post("/delete-order", isAuth, shopController.deleteOrder);

module.exports = router;
