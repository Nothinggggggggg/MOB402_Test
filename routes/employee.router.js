const express = require("express");

const Employee = require("../models/employee.model");

const router = express.Router();

// #READ
router.get("/list", async (req, res, next) => {
  try {
    // get list employees
    const employees = await Employee.find().lean().exec();

    // render
    // res.send(JSON.stringify(employees));
    res.render("home", {
      pageTitle: "Home",
      employees,
      count: employees.length,
    });
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});
router.get("/detail/:_id", async (req, res, next) => {
  try {
    // find by id
    const employee = await Employee.findById(req.params._id).lean().exec();

    // render
    // res.send(JSON.stringify(employee));
    res.render("detail", {
      pageTitle: "Detail",
      employee,
    });
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

// #CREATE
router.get("/create", (req, res, next) => {
  res.render("form", {
    pageTitle: "Create",
    action: "/employee/create",
    task: "Create",
  });
});
router.post("/create", async (req, res, next) => {
  try {
    // get data
    const { name, avatar, score } = req.body;

    // create employee
    const employee = new Employee({
      name,
      avatar,
      score,
    });

    await employee.save();

    // back to /list
    res.redirect("/employee/list");
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

// #UPDATE
router.get("/update/:_id", async (req, res, next) => {
  try {
    // find by id
    const employee = await Employee.findById(req.params._id).lean().exec();

    // render
    res.render("form", {
      pageTitle: "Update",
      action: "/employee/update/" + req.params._id,
      task: "Update",
      employee
    });
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});
router.post("/update/:_id", async (req, res, next) => {
  try {
    // get data
    const { name, avatar, score } = req.body;

    // update by id
    const employee = await Employee.findByIdAndUpdate(req.params._id, {
      name,
      avatar,
      score,
    });

    // back to /list
    res.redirect("/employee/list");
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

// #DELETE
router.get("/delete/:_id", async (req, res, next) => {
  try {
    // delete by id
    const employee = await Employee.findByIdAndDelete(req.params._id);

    // back to /list
    res.redirect("/employee/list");
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

// #QUERY
// #Search by 'name'
router.post("/list_search", async (req, res, next) => {
  try {
    // get input
    const { name } = req.body;

    // check input empty > back to /list
    if(!name){
        return res.redirect('/employee/list')
    }

    // search
    const employees = await Employee.find({
      name: {
        $regex: name,
        $options: "i",
      },
    }).lean().exec();

    // render
    // res.send(JSON.stringify(employees));
    res.render("home", {
      pageTitle: "Search",
      employees,
      count: employees.length,
    });
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

module.exports = router;
