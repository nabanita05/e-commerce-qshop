import express from "express";
import {
  checkout,
  paymentVerification,
  getPaymentDetails
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.route("/getPaymentDetails").post(getPaymentDetails)

export default router;
