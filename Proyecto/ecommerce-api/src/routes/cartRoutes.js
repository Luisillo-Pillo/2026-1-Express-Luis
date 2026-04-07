import express from "express";
import { body, param } from "express-validator";
import {
  getCarts,
  getCartById,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const cartIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Cart ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
];

const createCartValidation = [
  body("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  body("products")
    .optional()
    .isArray()
    .withMessage("Products must be an array"),
  body("products.*.product")
    .isMongoId()
    .withMessage("Each product must be a valid MongoDB ObjectId"),
  body("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than or equal to 1"),
];

const putCartValidation = [
  param("id")
    .isMongoId()
    .withMessage("Cart ID must be a valid MongoDB ObjectId"),
  body("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  body("products")
    .notEmpty()
    .withMessage("Products array is required")
    .isArray()
    .withMessage("Products must be an array"),
  body("products.*.product")
    .notEmpty()
    .withMessage("Each product item must include product ID")
    .isMongoId()
    .withMessage("Each product must be a valid MongoDB ObjectId"),
  body("products.*.quantity")
    .notEmpty()
    .withMessage("Each product item must include quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than or equal to 1"),
];

router.get("/cart", getCarts);
router.get("/cart/:id", cartIdValidation, validate, getCartById);
router.get("/cart/user/:id", userIdValidation, validate, getCartByUser);
router.post("/cart", createCartValidation, validate, createCart);
router.put("/cart/:id", putCartValidation, validate, updateCart);
router.delete("/cart/:id", cartIdValidation, validate, deleteCart);

export default router;
