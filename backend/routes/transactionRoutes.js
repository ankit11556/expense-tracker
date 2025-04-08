const express = require('express')
const transactionRouter = express.Router()
const transactionController = require('../controllers/transactionController')
const  verifyToken = require('../middlewares/verifyToken')
transactionRouter.post("/add", verifyToken.verifyToken,transactionController.createTransaction)
transactionRouter.get("/get", verifyToken.verifyToken,transactionController.getTransaction)
transactionRouter.put("/edit/:id", verifyToken.verifyToken,transactionController.editTransaction)
transactionRouter.delete("/delete/:id", verifyToken.verifyToken,transactionController.deleteTransaction)
module.exports = transactionRouter;