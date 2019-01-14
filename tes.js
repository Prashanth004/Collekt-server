var jsEncode = {
	encode: function (s, k) {
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

var e = jsEncode.encode("5bfd295387339b48106fb7ad","918027681781");
// result 3[Z 

var encodedString = btoa(e);
console.log(encodedString);

var decodedString  = atob(encodedString)
var d = jsEncode.encode(decodedString,"918027681781");
// // result Hello world!
console.log(d);

listID            // var list_setting = {
	//     "async": false,
	//     "crossDomain": true,
	//     "url": "localhost:1234/share/list/"+myVar,
	//     "method": "GET",
	//     "headers": {
	//         "Content-Type": "application/x-www-form-urlencoded",
	//     },
	// }
	// $.ajax(list_setting).done(function (response) {
	//     var htmlElement = " "

	//     htmlElement += '<div class="card" style="width: 18rem;">';
	//     htmlElement += '<div class="List_div">';
	//     htmlElement += '<div class="div_name">';
	//     htmlElement += '<p>' +response.List_name + '</p>';
	//     htmlElement += '</div>';
	//     htmlElement += '<div class="div_button">';
	//     htmlElement += '<div class="drop_list"id="button"><span class="caret"></span></div>';

	//     htmlElement += '</div>';

	//     htmlElement += '</div>';


	//     $('.main').append(htmlElement);
	// })







	<style>
	.main {
		width: 60%;
		margin: auto;
		/* position:absolute; */
		/* top:50px; */
	}

	.option {
		position: absolute;
		top: 0px;
		left: 35px;
		/* background-color: aqua; */
		width: 20px;
		float: right;
	}

	.no_button {
		padding: 5px;
		margin: -8;
		color: rgb(116, 115, 115);
	}

	.div_colapse {
		padding: 15px;
		width: 330px;
		font-size: 15px;
		background-color: white;
		height: 50px;
		margin-top: 0px;
		margin-bottom: 10px;
		margin-right: 0px;
		margin-left: 5px;
		border-radius: 0px;
		/* border-width:0.5px; */
		border-style: none;
		/* border-color:rgb(108, 108, 190); */
		/* border-bottom-style: solid; */
		/* border-right-style:solid; */


	}

	.div_colapse_back {
		box-shadow: 0px 2px 2px 2px rgba(231, 231, 231, 0.164);
		font-size: 12px;
		margin-left: 100px;
		background-color: rgb(233, 227, 227);
		border-top-right-radius: 0px;
		border-top-left-radius: 0px;
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
		border: 0.5px;
		padding: 5px;
		padding-block-start: 0px;
		padding-top: 10px;

		/* border-style: solid; */
		border-top-style: none;
		/* border-color: rgb(108, 108, 190); */
		/* border-width:0.5px; */
		width: 350px
	}

	.dropdown-content3 {
		position: relative;
		top: 9px;
		left: 9px;

		border-radius: 4px;
		display: none;
		position: absolute;
		left: -30px;
		background-color: white;
		min-width: 70px;
		width: 70px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		padding: 3px;
		margin: 5px;
		z-index: 1;
		/* overflow: visible !important; */
		/* overflow-x: hidden; */
	}

	.drop_list {
		position: absolute;
		/* top:0px; */
		left: 10px;
		width: 15px;
		/* background-color: blueviolet; */
	}

	.div_button {
		height: 20px;
		position: relative;
		/* left:295px; */
		float: right;
		width: 55px;
		/* background-color: blcolue */

	}

	.div_name {
		width: 220px;
		/* background-color: red; */
		float: left;

	}

	.List_div {
		height: 50px;
		width: 350px;
		box-shadow: 0px 2px 2px 2px rgba(216, 216, 216, 0.164);
		padding: 12px;
		font-size: 12px;
		margin-left: 100px;
		margin-bottom: 0px;

		background-color: white;
		border-radius: 5px;
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;

		border: 0.5px;

	}
</style>




const Card = require('../models/Card.model');
const User = require('../models/user')
const io = require('../app')

exports.test = function (req, res) {
    if (!req.user) {

        res.status(401).send({
            login_status: 0,
            active_status: 0

        })
    }
    else {
        if (req.user.active == 1) {
            res.status(200).send({
                login_status: 1,
                active_status: 1,
                data: req.user

            })
        }
        else {
            res.status(200).send({
                login_status: 1,
                active_status: 0,
                data: req.user

            })

        }

    }

};
exports.product_update = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.find({ session_id: req.user._id, _id: req.params._id }, function (err, data) {
            if (err) res.status(400).send(err);
            var flag = 0
            for (var i in data[0].sticker) {
                if (data[0].sticker[i] == req.body.sticker) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                Card.findByIdAndUpdate({ "_id": req.params._id }, { $push: { "sticker": req.body.sticker } }, function (err, product) {
                    if (err) return next(err);
                    res.status(201).send('Product udpated.');
                });

            }
            else {
                res.send("not possible")
            }
        })
    }
};

exports.product_update_public = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "public": req.body.public } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};





exports.product_update_value = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "why": req.body.why } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};

exports.product_update_list = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id },  { $push: { "lists": req.body.listId } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};



exports.delete_lists = function(req, res, next){
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        var flag = 1
        Card.find({ session_id: req.user._id }, function (err, data) {
            console.log(data)

    
                Card.update({}, { $pull: { lists: { $in: [req.body.listId] } } }, { multi: true }, function (err, data) {
                    if (err) {
                        res.status(500).send({
                            success: 0,
                            error: err
                        })
                    }
                    else {
                        res.status(200).send(
                            {
                                success: 1,
                                data: data
                            });
                    }

                });
           
        });
    }
}

exports.product_create = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {


        Card.find({ session_id: req.user._id, name: req.body.name }, function (err, product) {
            if (err) res.status(400).send(err);
            if (product.length == 0) {
                let product = new Card(
                    {
                        session_id: req.user._id,
                        name: req.body.name,
                        profile_url: req.body.profile_url,
                        why: req.body.why,
                        date: req.body.date,
                        time: req.body.time,
                        lists: req.body.lists,
                        public: req.body.public,
                        domain: req.body.domain,
                        sticker: req.body.sticker,
                        unq_name:req.body.unq_name

                    }
                );

                product.save().then(function (body) {

                    if (body) {
                      
                        res.status(201).send({
                            login_status: 1,
                            sucess: 1,
                            error: err
                        })
                    }
                    else {
                        res.status(500).send({
                            login_status: 1,
                            sucess: 0
                        })
                    }
                })
            }
            else {
                res.send({ success: 0, msg: "product existing" })
            }

        })


    }

}

exports.cardInfo = function(req,res,next){

    if (!req.user) {
        
        res.status(401).send({ success: 0, msg: "You should login" })

    } else {
        console.log(req.body)
        Card.find({ session_id: req.user._id, name: req.body.name, domain: req.body.domain, unq_name:req.body.unq_name }, function (err, product) {
            if (err) res.status(400).send(err);
            if (product.length > 0) {
                res.status(200).send({
                    collected : 1,
                    sameDomain: 0,
                    diffDomain:0
                })
            }
            else{
                Card.find({ session_id: req.user._id, name: req.body.name, domain: req.body.domain  }, function (err, product1) {
                    if (err) res.status(400).send(err);
                    if (product1.length >0) {
                        res.status(200).send({
                            collected : 0,
                            sameDomain: 1,
                            diffDomain:0
                        })
                    }
                    else{
                        Card.find({ session_id: req.user._id, name: req.body.name  }, function (err,    product2) {
                            if (err) res.status(400).send(err);
                            if (product2.length >0) {
                                console.log(product2[0].domain)
                                res.status(200).send({
                                    collected : 0,
                                    sameDomain: 0,
                                    diffDomain:1,
                                    domain:product2[0].domain
                
                                })
                            }
                            else{
                                Card.find({ session_id: req.user._id, name: req.body.name}, function (err, product3) {
                                    if (err) res.status(400).send(err);
                                    if (product3.length ===0) {
                                        res.status(200).send({
                                            collected : 0,
                                            sameDomain: 0,
                                            diffDomain:0
                                        })
                                    }
                        
                                })
                            }
                
                        })
                    }
        
                })

            }

        })


       
}
    }


exports.product_details = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        // Lists.findByIdAndRemove(req.params.id, function (err) {
        Card.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            res.send(product);
        })
    }
}

exports.product_details_all = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Card.find({ session_id: req.user._id }, function (err, product) {
            if (err) res.status(400).send(err);
            res.send(product);
        })
    }
}

exports.product_delete = function (req, res) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Card.findByIdAndRemove(req.params.id, function (err) {
            if (err) res.status(400).send(err);
            res.send('Deleted successfully!');
        })

    }

};















const Card = require('../models/Card.model');
const User = require('../models/user')
const io = require('../app')

exports.test = function (req, res) {
    if (!req.user) {

        res.status(401).send({
            login_status: 0,
            active_status: 0

        })
    }
    else {
        if (req.user.active == 1) {
            res.status(200).send({
                login_status: 1,
                active_status: 1,
                data: req.user

            })
        }
        else {
            res.status(200).send({
                login_status: 1,
                active_status: 0,
                data: req.user

            })

        }

    }

};
exports.product_update = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.find({ session_id: req.user._id, _id: req.params._id }, function (err, data) {
            if (err) res.status(400).send(err);
            var flag = 0
            for (var i in data[0].sticker) {
                if (data[0].sticker[i] == req.body.sticker) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                Card.findByIdAndUpdate({ "_id": req.params._id }, { $push: { "sticker": req.body.sticker } }, function (err, product) {
                    if (err) return next(err);
                    res.status(201).send('Product udpated.');
                });

            }
            else {
                res.send("not possible")
            }
        })
    }
};

exports.product_update_public = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "public": req.body.public } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};





exports.product_update_value = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $set: { "why": req.body.why } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};

exports.product_update_list = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $push: { "lists": req.body.listId } }, function (err) {
            if (err) return res.status(400).send(err);

            res.status(200).send({ success: 1, msg: "product updated" })



        })
    }
};



exports.delete_lists = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        var flag = 1
        Card.find({ session_id: req.user._id }, function (err, data) {
            console.log(data)


            Card.update({}, { $pull: { lists: { $in: [req.body.listId] } } }, { multi: true }, function (err, data) {
                if (err) {
                    res.status(500).send({
                        success: 0,
                        error: err
                    })
                }
                else {
                    res.status(200).send(
                        {
                            success: 1,
                            data: data
                        });
                }

            });

        });
    }
}

exports.product_create = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        let product = new Card(
            {
                session_id: req.user._id,
                name: req.body.name,
                profile_url: req.body.profile_url,
                why: req.body.why,
                date: req.body.date,
                time: req.body.time,
                lists: req.body.lists,
                public: req.body.public,
                domain: req.body.domain,
                sticker: req.body.sticker,
                unq_name: req.body.unq_name

            }
        );
        product.save().then(function (body) {
            if (body) {
                res.status(201).send({
                    login_status: 1,
                    sucess: 1,

                })
            }
            else {
                res.status(500).send({
                    login_status: 1,
                    sucess: 0
                })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send({
                success: 0,
                err: err0r
            })
        })



    }

}

exports.cardInfo = function (req, res, next) {

    if (!req.user) {

        res.status(401).send({ success: 0, msg: "You should login" })

    } else {
        console.log(req.body)
        Card.find({ session_id: req.user._id, name: req.body.name, domain: req.body.domain, unq_name: req.body.unq_name }, function (err, product) {
            if (err) res.status(400).send(err);
            if (product.length > 0) {
                res.status(200).send({
                    collected: 1,
                    sameDomain: 0,
                    diffDomain: 0
                })
            }
            else {
                Card.find({ session_id: req.user._id, name: req.body.name, domain: req.body.domain }, function (err, product1) {
                    if (err) res.status(400).send(err);
                    if (product1.length > 0) {

                        Card.find({ session_id: req.user._id, domain: req.body.domain, unq_name: req.body.unq_name }, function (err, product5) {
                            if (product5.length == 0) {
                                res.status(200).send({
                                    collected: 0,
                                    sameDomain: 1,
                                    diffDomain: 0
                                })
                            }
                            else {


                                Card.find({ session_id: req.user._id, name: req.body.name }, function (err, product2) {
                                    if (err) res.status(400).send(err);
                                    if (product2.length > 0) {
                                        console.log(product2[0].domain)
                                        res.status(200).send({
                                            collected: 0,
                                            sameDomain: 0,
                                            diffDomain: 1,
                                            domain: product2[0].domain

                                        })
                                    }
                                    else {
                                        Card.find({ session_id: req.user._id, name: req.body.name }, function (err, product3) {
                                            if (err) res.status(400).send(err);
                                            if (product3.length === 0) {
                                                res.status(200).send({
                                                    collected: 0,
                                                    sameDomain: 0,
                                                    diffDomain: 0
                                                })
                                            }

                                        })
                                    }

                                })
                            }
                        })
                    }

                })

            }

        })



    }
}


exports.product_details = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        // Lists.findByIdAndRemove(req.params.id, function (err) {
        Card.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            res.send(product);
        })
    }
}

exports.product_details_all = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Card.find({ session_id: req.user._id }, function (err, product) {
            if (err) res.status(400).send(err);
            res.send(product);
        })
    }
}

exports.product_delete = function (req, res) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Card.findByIdAndRemove(req.params.id, function (err) {
            if (err) res.status(400).send(err);
            res.send('Deleted successfully!');
        })

    }

};

