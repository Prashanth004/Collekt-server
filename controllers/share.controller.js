const Lists = require('../models/List.model')
const Card = require('../models/Card.model')
const keys = require('../config/keys');
exports.shareList = function(req,res,next){

    // Lists.find({_id:req.params.id}, function(err,data){
    //     if(err){
    //         res.send("no data")
    //     }
    //     if(data.length>0){
    //         res.status(200).send({
    //             status:1,
    //             msg: data
    //         })
    //     }
    // })
}

exports.showLists = function( req, res,next){
    return res.render('list.ejs', {listID:JSON.stringify(req.params.id)});
}

exports.shareListById = function( req, res, next){
    var chars = {'a':'d','d':'y','y':'a'};
    dec = req.params.id.replace(/[ady]/g, m => chars[m]);
      token = dec.replace(/[ady]/g, m => chars[m]);
     
   
   
    Lists.find({_id:token}, function(err,data){
        if(err){
            res.send(err)
        }
        else{
            res.status(200).send({
                status:1,
                msg: data
            })
        }
        
    })
}


exports.shareCardById = function( req, res, next){
    Card.find({_id:req.params.id}, function(err,data){
        if(err){
            res.send("no data")
        }
       else{
            res.status(200).send({
                status:1,
                msg: data
            })
        }
    })
}

var jsDecode = {
	decode: function (s, k) {
		var enc = "";
		var str = "";
		// make sure that input is string
		str = s.toString();
		for (var i = 0; i < s.length; i++) {
			// create block
			var a = s.charCodeAt(i);
			// bitwise XOR
			var b = a ^ k;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	}
};