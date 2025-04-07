const express = require('express')
const transactionRouter = express.Router()
const transactionController = require('../controllers/transactionController')
import { verifyToken } from '../middlewares/verifyToken'
transactionRouter.post("/add", verifyToken,transactionController.createTransaction)
transactionRouter.get("/get", verifyToken,transactionController.getTransaction)
transactionRouter.put("/edit/:id", verifyToken,transactionController.editTransaction)
transactionRouter.delete("/delete/:id", verifyToken,transactionController.deleteTransaction)
module.exports = transactionRouter;