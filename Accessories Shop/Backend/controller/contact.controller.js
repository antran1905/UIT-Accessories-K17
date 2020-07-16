var router = global.router;
let contact = require('../models/Contact');
var mongoose = require("mongoose")
let fs = require('fs');

module.exports.sendContact = function (req, res, next) {
    const newContact = new contact({
        email:req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        content: req.body.content,
    });
    newContact.save(function (err, contact) {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "successful",
                data: {
                    email:req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    content: req.body.content,
                },
                message: "Send contact success"
            });
        };
    })
};

module.exports.getContact = function (req, res, next) {  //xuat tat ca ds cmt
    contact.find({}).sort({ name: 1 }).select({
        email:1,
        name: 1,
        phone:1,
        content: 1,

    }).exec(function (err, contact) {
        if (err) {
            res.json({
                result: "failed",
                data: [],
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: "successful",
                data: contact,
                message: "Query list of contact success"
            });
        };
    })
};

