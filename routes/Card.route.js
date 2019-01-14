const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/Card.controller');

const user_controller = require('../controllers/user.controller')
// a simple test url to check that all of our files are communicating correctly.
router.get('/exporttocsv',product_controller.product_export);
router.get('/test', product_controller.test);
router.put('/delete/list/',product_controller.delete_lists)
router.put('/public/:id', product_controller.product_update_public);
router.put('/list/:id',product_controller.product_update_list);
router.put('/:_id', product_controller.product_update);
router.put('/why/:id', product_controller.product_update_value)
router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.post('/valid/info',product_controller.cardInfo)
router.get('/', product_controller.product_details_all);
router.delete('/:id', product_controller.product_delete);
router.put('/public/:id', product_controller.product_update_public);

module.exports = router;