const Card = require('../models/Card.model');
const User = require('../models/user')
const io = require('../app')
var csv = require('csv-express');

exports.test = function (req, res) {

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

};
exports.product_update = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.find({ user_id: req.user._id, _id: req.params._id }, function (err, data) {
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

exports.product_update_remove_list = function(req,res,next){
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.findByIdAndUpdate({ "_id": req.params.id }, { $pull: { "lists": req.body.listId } }, function (err) {
            if (err) return res.status(400).send(err);
            res.status(200).send({ success: 1, msg: "product updated" })
        }) 
    }
}
exports.product_update_add_list = function (req, res, next) {
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
        Card.find({ user_id: req.user._id, }, function (err, data) {


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

exports.product_export = function (req, res, nect) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        var filename = "products.csv";

        var dataArray;

        Card.find({ user_id: req.user._id, }).lean().exec({}, function (err, products) {

            if (err) res.send(err);
            NewProduct = [];
            for (items in products) {
                var tempProduct = null;
                tempProduct = {
                    Name: products[items].name,
                    Profile_Url: products[items].profile_url,
                    Reason: products[items].why,
                    Date: products[items].date,
                    Time: products[items].time,
                    Domain: products[items].domain,
                }
                NewProduct.push(tempProduct)
            }
            res.statusCode = 200;

            res.setHeader('Content-Type', 'text/csv');

            res.setHeader("Content-Disposition", 'attachment; filename=' + filename);

            res.csv(NewProduct, true);

        });
    }
}

exports.product_create = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        console.log("user id : ", req.user._id)
        Card.find({ user_id: req.user._id, unq_name: req.body.unq_name }, function (err, product) {
            if (err) res.status(400).send(err);
            if (product.length == 0) {
                let product = new Card(
                    {
                        user_id: req.user._id,
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
                            error: err,
                            data: body
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

                Card.findOneAndUpdate({ user_id: req.user._id, unq_name: req.body.unq_name }, { $set: { "why": req.body.why } }, function (err) {
                    if (err) return res.status(400).send(err);

                    res.status(200).send({ success: 1, msg: "product updated" })
                });

            }

        })


    }

}

exports.cardInfo = function (req, res, next) {

    if (!req.user) {

        res.status(401).send({ success: 0, msg: "You should login" })

    } else {
        Card.find({ user_id: req.user._id, domain: req.body.domain, unq_name: req.body.unq_name }, function (err, product) {
            if (err) res.status(400).send(err);
            if (product.length > 0) {
                res.status(200).send({
                    collected: 1,
                    sameDomain: 0,
                    diffDomain: 0
                })
            }
            else {
                Card.find({ user_id: req.user._id, name: req.body.name, domain: req.body.domain }, function (err, product1) {
                    if (err) res.status(400).send(err);
                    if (product1.length > 0) {
                        res.status(200).send({
                            collected: 0,
                            sameDomain: 1,
                            diffDomain: 0,

                        })
                    }
                    else {
                        Card.find({ user_id: req.user._id, name: req.body.name }, function (err, product2) {
                            if (err) res.status(400).send(err);
                            if (product2.length > 0) {
                                res.status(200).send({
                                    collected: 0,
                                    sameDomain: 0,
                                    diffDomain: 1,
                                    domain: product2[0].domain,
                                    url: product2[0].profile_url

                                })
                            }
                            else {
                                Card.find({ user_id: req.user._id, name: req.body.name }, function (err, product3) {
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
        console.log("req.user when trying to find the all cards : ", req.user);
        Card.find({ user_id: req.user._id }, function (err, product) {
            console.log("products : ", product);
            if (err) res.status(400).send(err);
            res.send(product);
        })



        // Card.find({ session_id: req.user._id }, function (err, product) {
        //     if (err) res.status(400).send(err);
        //     res.send(product);
        // })
    }
}

exports.product_delete_all = function(req,res,next){
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {
        Card.remove({ user_id: req.user._id}, function (err) {
            if (err) res.status(400).send(err);
            res.send('Deleted successfully!');
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