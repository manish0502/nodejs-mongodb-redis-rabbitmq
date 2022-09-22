const express = require('express')
const router = express.Router()

const {
      register,
      login 
       } = require('../controllers/auth.controller')
       

router.route('/signup')
        .post(register)


router.route('/signin')
            .post(login)

module.exports = router
