const express = require('express');
const router = express.Router();

const Shar_controller = require('../controllers/share.controller');

router.get('/show/list/:id',Shar_controller.showLists);
router.get('/list/:id', Shar_controller.shareListById);
router.get('/card/:id',Shar_controller.shareCardById);
router.get('/show/list/twitter',function(req,res){
    return res.render('../views/twitter.jpg');
});
router.get('/show/list/twitter',function(req,res){
    return res.render('../views/twitter.jpg');
});
router.get('/show/list/facebook',function(req,res){
    return res.render('../views/facebook.jpg');
});
router.get('/show/list/angel',function(req,res){
    return res.render('../views/angel.jpg');
});
module.exports = router;