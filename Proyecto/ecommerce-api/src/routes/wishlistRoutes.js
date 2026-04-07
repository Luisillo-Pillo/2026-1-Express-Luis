import express from "express";
import { body, param } from "express-validator";
import {
  getWishlists,
  getWishlistByUser,
  addProductToWishlist,
  removeProductFromWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const wishlistIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Wishlist ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
];

const addProductValidation = [
  body("userId").isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),
  body("productId").isMongoId().withMessage("Product ID must be a valid MongoDB ObjectId"),
];

const removeProductValidation = [
  param("id").isMongoId().withMessage("Wishlist ID must be a valid MongoDB ObjectId"),
  body("productId").isMongoId().withMessage("Product ID must be a valid MongoDB ObjectId"),
];

router.get("/wishlist", getWishlists);
router.get("/wishlist/user/:id", userIdValidation, validate, getWishlistByUser);
router.post("/wishlist", addProductValidation, validate, addProductToWishlist);
router.delete(
  "/wishlist/:id/product",
  removeProductValidation,
  validate,
  removeProductFromWishlist
);
router.delete("/wishlist/:id", wishlistIdValidation, validate, deleteWishlist);

export default router;
