const { userModel, recoveryCodeModel, messageModel } = require("../modules/user/model/user.model");
const { createDatabase } = require("./createDatabase");
const { adminModel } = require("../modules/admin/model/admin.model");
const { categoryModel } = require("../modules/category/model/category.model");
const { storeModel, storeCategoriesModel } = require("../modules/store/model/store.model");
const {productModel} = require("../modules/product/model/product.model");
const {wishlistModel} = require("../modules/wishlist/model/wishlist.model");



let createTables = () => {
    createDatabase();
    userModel();
    recoveryCodeModel();
    messageModel();
    adminModel();
    categoryModel();
    storeModel();
    storeCategoriesModel();
    productModel();
    wishlistModel()
}

module.exports = {
    createTables
}