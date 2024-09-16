const express = require("express");
const router = express.Router();
const {postCar,postHome,postPersonal} = require("../Controllers/controller");

router.post("/",postHome);

router.post("/car",postCar);

router.post("/personal",postPersonal);

module.exports = router;