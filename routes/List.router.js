const express = require('express');
const router = express.Router();

const List_controller = require('../controllers/List.controller');

router.post('/create',List_controller.list_create);
router.get('/',List_controller.list_get);
router.get('/:id',List_controller.list_get_id);
router.put('/ad/:id',List_controller.list_update_add_card);
router.put('/rm',List_controller.list_update_remove_card);

router.delete('/:id',List_controller.lists_delete);

module.exports = router;