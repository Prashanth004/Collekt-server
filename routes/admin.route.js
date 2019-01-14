const express = require('express');
const router = express.Router();


const admin_controller = require('../controllers/Admin.controller');
router.get('/login', admin_controller.admin_login_view);
router.get('/logout', admin_controller.admin_logout);
router.post('/register', admin_controller.admin_register);

router.get('/dashboard', admin_controller.admin_dash_board);


// router.get('/',admin_controller.get_allusers)
// router.get('/register',user_controller.user_register_view)

module.exports = router;