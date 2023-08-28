const express = require("express");
const router = express.Router();
const User = require("../model/Order");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwtToken = require('jsonwebtoken')
const jwtKey ="myNameIsRizwanAndIamusingJwt"
router.post(
  "/createUser",
  [
    body("name", "invalid name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    //bcrypt salt
    let salt = await bcrypt.genSalt(10);
    // generate hash
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("password", "incorrect password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ error: "try loggin with correct credential" });
      }
      // comparing.....
      const pwdComp =await bcrypt.compare(req.body.password,userData.password);
      if (!pwdComp) {
        return res
          .status(400)
          .json({ error: "try loggin with correct credentials" });
      }
      const data = {
        user:{
             id:userData.id
        }
      }
      const authToken = jwtToken.sign(data,jwtKey) 
      return res.json({ success: true ,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
