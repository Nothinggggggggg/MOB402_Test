const express = require("express");
const multer = require("multer");

const Employee = require("../models/employee.model");
const { uploadOne } = require("../upload_file");

const router = express.Router();

/////////////////////////////////////////////////// #READ
// #List
router.get("/list", async (req, res, next) => {
  try {
    // get list employees
    const employees = await Employee.find().lean().exec();

    // render
    return res.render("home", {
      pageTitle: "Home",
      employees,
      count: employees.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// #Item
router.get("/detail/:_id", async (req, res, next) => {
  try {
    // find by id
    const employee = await Employee.findById(req.params._id).lean().exec();

    // render
    return res.render("detail", {
      pageTitle: "Detail",
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/////////////////////////////////////////////////////// #CREATE
router.get("/create", (req, res, next) => {
  res.render("form", {
    pageTitle: "Create",
    action: "/employees/create",
    task: "Create",
  });
});
router.post("/create", (req, res, next) => {
  try {
    // handle upload image
    uploadOne(req, res, async (error) => {
      if (error) {
        return res.render("form", {
          pageTitle: "Create",
          action: "/employees/create",
          task: "Create",
          notify: `fail: ${error.message}`,
        });
      } else {
        // handle create
        // _get data
        const { name, score } = req.body;
        const avatar = req.file.originalname;

        // _create employee
        const employee = new Employee({
          name,
          avatar,
          score,
        });

        await employee.save();

        // _back to /list
        return res.redirect("/employees/list");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////////////////// #UPDATE
router.get("/update/:_id", async (req, res, next) => {
  try {
    // find by id
    const employee = await Employee.findById(req.params._id).lean().exec();

    // render
    return res.render("form", {
      pageTitle: "Update",
      action: "/employees/update/" + req.params._id,
      task: "Update",
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/update/:_id", (req, res, next) => {
  try {
    // handle upload image
    uploadOne(req, res, async (error) => {
      if (error) {
        // find by id
        const employee = await Employee.findById(req.params._id).lean().exec();

        // render
        return res.render("form", {
          pageTitle: "Update",
          action: "/employees/update/" + req.params._id,
          task: "Update",
          employee,
          notify: error.message,
        });
      } else {
        // handle update
        // _get data
        const { name, score } = req.body;

        // _update by id
        if (req.file) {
          const avatar = req.file.originalname;
          const employee = await Employee.findByIdAndUpdate(req.params._id, {
            name,
            avatar,
            score,
          });
        } else {
          const employee = await Employee.findByIdAndUpdate(req.params._id, {
            name,
            score,
          });
        }

        // _back to /list
        return res.redirect("/employees/list");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

////////////////////////////////////////////////// #DELETE
router.get("/delete/:_id", async (req, res, next) => {
  try {
    // delete by id
    const employee = await Employee.findByIdAndDelete(req.params._id);

    // back to /list
    return res.redirect("/employees/list");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////////////// #QUERY
// #Search by 'name'
router.post("/list_search", async (req, res, next) => {
  try {
    // get input
    const { name } = req.body;

    // check input empty > back to /list
    if (!name) {
      return res.redirect("/employees/list");
    }

    // search
    const employees = await Employee.find({
      name: {
        $regex: name,
        $options: "i",
      },
    })
      .lean()
      .exec();

    // render
    return res.render("home", {
      pageTitle: "Search",
      employees,
      count: employees.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
