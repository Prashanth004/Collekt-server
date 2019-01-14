const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const user_controller = require('../controllers/user.controller');
// app.use(bodyParser.json());
router.use(bodyParser.json())
router.get('/logout',user_controller.user_logout)
router.post('/register',user_controller.user_register)
router.get('/test',user_controller.test_user)
// router.post('/login',user_controller.user_login)
router.get('/',user_controller.get_allusers)
router.get('/:id',user_controller.get_user)
router.put('/:id',user_controller.user_update)
router.delete('/:id',user_controller.user_delete)
// router.get('/register',user_controller.user_register_view)

module.exports = router;