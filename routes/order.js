import express from "express"
import passport from "passport"
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from "../controllers/orderControllers.js"
import{ logout, myProfile }from "../controllers/userController.js"
import { authorizeAdmin, isAuthenticated } from "../middelware/auth.js"

const router = express.Router();

router.post("/placeorder",isAuthenticated ,placeOrder);
router.post("/placeorderonline",isAuthenticated ,placeOrderOnline);
router.post("/paymentverification",isAuthenticated ,paymentVerification);


router.get("/myorder", isAuthenticated ,getMyOrders)
router.get("/order/:id", isAuthenticated ,getOrderDetails)
//Add admin middleware
router.get("/admin/orders", isAuthenticated ,authorizeAdmin ,getAdminOrders)
router.get("/admin/order/:id", isAuthenticated ,authorizeAdmin ,processOrder)

export default router