const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {
    // name: "error description",
    // status: false or true
  };

  // If first_name is not empty, then set first_name. If empty, will set as empty string
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";

  if (validator.isEmpty(data.first_name)) {
    errors.message = "First name field is required";
  }

  if (validator.isEmpty(data.last_name)) {
    errors.message = "Last name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
