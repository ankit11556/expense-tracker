const express = require('express')
const transactionRouter = express.Router()
const transactionController = require('../controllers/transactionController')

transactionRouter.post("/add",transactionController.createTransaction)
transactionRouter.get("/get",transactionController.getTransaction)
transactionRouter.put("/edit/:id",transactionController.editTransaction)
transactionRouter.delete("/delete/:id",transactionController.deleteTransaction)
module.exports = transactionRouter;