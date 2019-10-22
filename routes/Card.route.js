const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/Card.controller');

const user_controller = require('../controllers/user.controller')
// a simple test url to check that all of our files are communicating correctly.
router.get('/exporttocsv',passport.authenticate('jwt', { session: false }),product_controller.product_export);
router.get('/test',passport.authenticate('jwt', { session: false }), product_controller.test);
router.put('/rmall/list/',passport.authenticate('jwt', { session: false }),product_controller.delete_lists)
router.put('/public/:id',passport.authenticate('jwt', { session: false }), product_controller.product_update_public);
router.put('/ad/list/:id',passport.authenticate('jwt', { session: false }),product_controller.product_update_add_list);
router.put('/rm/list/:id',passport.authenticate('jwt', { session: false }),product_controller.product_update_remove_list);
router.put('/:_id',passport.authenticate('jwt', { session: false }), product_controller.product_update);
router.put('/why/:id',passport.authenticate('jwt', { session: false }), product_controller.product_update_value)
router.post('/create',passport.authenticate('jwt', { session: false }), product_controller.product_create);
router.get('/:id',passport.authenticate('jwt', { session: false }), product_controller.product_details);
router.post('/valid/info',passport.authenticate('jwt', { session: false }),product_controller.cardInfo)
router.get('/',passport.authenticate('jwt', { session: false }), product_controller.product_details_all);
router.delete('/:id',passport.authenticate('jwt', { session: false }), product_controller.product_delete);
router.delete('/',passport.authenticate('jwt', { session: false }),product_controller.product_delete_all)
router.put('/public/:id',passport.authenticate('jwt', { session: false }), product_controller.product_update_public);

module.exports = router;