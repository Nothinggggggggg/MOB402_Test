const express = require("express");

const Employee = require("../models/employee.model");

const router = express.Router();

////////////////////////////////////////////////// #READ
// #List
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await Employee.find();

    if (employees.length) {
      return res.json({
        message: "success",
        employees,
      });
    } else {
      return res.json({
        message: "fail: empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// #Item
router.get("/employees/:_id", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params._id);

    if (employee) {
      return res.json({
        message: "success",
        employee,
      });
    } else {
      return res.json({
        message: "fail: empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////////////////////////// #CREATE
router.post("/employees", async (req, res, next) => {
  try {
    const { name, avatar, score } = req.body;

    const employee = new Employee({
      name,
      avatar,
      score,
    });

    await employee.save();

    if (employee) {
      return res.json({
        message: "success",
        employee,
      });
    } else {
      return res.json({
        message: "fail: empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////// #UPDATE
router.patch("/employees/:_id", async (req, res, next) => {
  try {
    const { name, avatar, score } = req.body;

    const employee = await Employee.findByIdAndUpdate(req.params._id, {
      name,
      avatar,
      score,
    });

    if (employee) {
      return res.json({
        message: "success",
        employee,
      });
    } else {
      return res.json({
        message: "fail: empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////// #DELETE
router.delete("/employees/:_id", async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params._id);

    if (employee) {
      return res.json({
        message: "success",
        employee,
      });
    } else {
      return res.json({
        message: "fail: empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
