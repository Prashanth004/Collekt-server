const Lists = require('../models/List.model')
const User = require('../models/user.js')
const Cards = require('../models/Card.model')
var socket = require('socket.io');


exports.list_create = function (req, res, next) {
    console.log("req.user : ",req.user)
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Lists.find({ user_id: req.user._id, name: req.body.list_name }, function (err, lists) {
            if (err) {
                console.log("error : ",err)
                res.status(400).send(err);
            }
            if (lists.length == 0) {
                let new_list = new Lists(
                    {
                        user_id: req.user._id,
                        List_name: req.body.list_name,
                        Cards_id: req.body.Cards_id
                    });
                new_list.save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            success: 0,
                            error: err
                        });
                    }
                    else {
         
                        res.status(201).send({
                            sucess: 1,
                            data: data
                        });
                    }

                });


            }
            else {
                res.status(450).send({
                    status: 0,
                    msg: "the list name alreasy exixts"

                });
            }
        });
    }
}
exports.list_get = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Lists.find({ user_id: req.user._id }, function (err, data) {
            if (err) res.status(400).send(err);
            res.status(200).send(data);

        })
    }

}





exports.list_get_id = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Lists.find({ user_id: req.user._id, _id: req.params.id }, function (err, data) {
            if (err) res.status(400).send(err);
            res.status(200).send(data);

        })
    }

}



exports.list_update_add_card = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        var exists = 1
        var limit = 1;
        console.log("req.params.id : req.body.Cards_id : ", req.params.id ,req.body.Cards_id)
        Lists.find({ user_id: req.user._id, _id: req.params.id }, function (err, data) {
            for (var i in data[0].Cards_id) {
                if (data[0].Cards_id[i] == req.body.Cards_id) {
                    exists = 0
                }
            }
            Cards.find({ user_id: req.user._id, _id: req.body.Cards_id }, function (err, data) {
                console.log("data from cards : ",data)
                if ((data[0].lists).length > 2) {
                    limit = 0
                }
            }).then(function () {
                if (exists == 1 && limit == 1) {
                    Lists.findByIdAndUpdate({ "_id": req.params.id }, { $push: { "Cards_id": req.body.Cards_id } }, function (err, data) {
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
                }
                else if (exists == 0) {
                    res.status(200).send({
                        success: 0,
                        card_exists: 1,
                        limit: 0
                    })
                }
                else if (limit == 0) {
                    res.status(200).send({
                        success: 0,
                        card_exists: 0,
                        limit: 1
                    })
                }
            })
        });
    }

}




exports.list_update_remove_card = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        var flag = 1
       
                Lists.update({}, { $pull: { Cards_id: { $in: [req.body.Cards_id] } } }, { multi: true }, function (err, data) {
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
           
    }

}



exports.lists_delete = function (req, res, next) {
    if (!req.user) {
        res.status(401).send({ success: 0, msg: "You should login" })
    } else {

        Lists.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.status(200).send({
                success: 1
            });
        })

    }

};



