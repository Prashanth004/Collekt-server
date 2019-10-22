const express = require('express');
const router = express.Router();
const passport = require('passport');

const List_controller = require('../controllers/List.controller');

router.post('/create',passport.authenticate('jwt', { session: false }),List_controller.list_create);
router.get('/',passport.authenticate('jwt', { session: false }),List_controller.list_get);
router.get('/:id',passport.authenticate('jwt', { session: false }),List_controller.list_get_id);
router.put('/ad/product/:id',passport.authenticate('jwt', { session: false }),List_controller.list_update_add_card);
router.put('/rm/product/:id',passport.authenticate('jwt',{session : false}),List_controller.list_update_remove_card)
router.put('/rmall/product',passport.authenticate('jwt', { session: false }),List_controller.list_update_remove_card_from_all_list);
router.delete('/:id',passport.authenticate('jwt', { session: false }),List_controller.lists_delete);

module.exports = router;