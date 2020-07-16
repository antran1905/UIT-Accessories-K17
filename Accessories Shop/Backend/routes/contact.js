var router = global.router;
let contact = require("../models/Contact");
var mongoose = require("mongoose");
let fs = require("fs");
const {isAuth} = require('../controller/authencation.controller');
/* GET users listing. */

var controller = require("../controller/contact.controller");

router.get("/get_user_contact", controller.getContact);

router.post("/post_contact", controller.sendContact);



module.exports = contact;