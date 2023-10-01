const router = require('express').Router()
const { controllers : userControllers} =require('../api/v1/user')


router
.route("/api/v1/users")
.post(userControllers.create)



module.exports = {userRouter:router}