const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
//   await data.splice(0, 0, { Order_data: req.body.order_data });
  console.log("--------- ", req.body, data);
  // if eamil not exist in database else insert .
  let e_Id = await Order.findOne({ email: req.body.email });
  if (e_Id==null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: data,
      })
      res.status(201).json({ success: true });
    } catch (error) {
      console.log("Server Error", error.message);
      res.status(500).send("Server Error");
    }
  } else {
    try {
        await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } }
        )
        res.status(201).json({ success: true });
    } catch (error) {
        console.log("Server Error", error.message);
        res.status(500).send("Server Error");
    }
    // await Order.findOneAndUpdate(
    //   { email: req.body.email },
    //   { $push: { order_data: Order } }
    // ).then(() => {
    //   res.json({ success: true });
    // });
  }
});

module.exports = router;
