const mongoose = require("mongoose");
const { MOB402_Connection } = require("../helpers/connections_mongodb");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { collection: "employees", versionKey: false }
);

const EmployeeModel = MOB402_Connection.model("employee", EmployeeSchema);

module.exports = EmployeeModel;
