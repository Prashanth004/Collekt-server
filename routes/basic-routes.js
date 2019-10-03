const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    console.log("hitting the endpoint")
    res.render('../views/home.ejs')
});
router.get('/privacyPolicy',function(req,res){
    res.render('privacy.ejs')
});

module.exports = router;