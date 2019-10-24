// const validator = require("validator");
// const isEmpty = require("./is-empty");

// module.exports = function validateLoginInput(data) {
//   let errors = {};

//   data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
//   data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
//   data.email = !isEmpty(data.email) ? data.email : "";
//   data.password = !isEmpty(data.password) ? data.password : "";

//   // data.username = !isEmpty(data.username) ? data.username : "";
//   // data.password = !isEmpty(data.password) ? data.password : "";

//   if (validator.isEmpty(data.first_name)) {
//     errors.first_name = "First name field is required";
//   }

//   if (validator.isEmpty(data.last_name)) {
//     errors.last_name = "Last name field is required";
//   }

//   if (validator.isEmpty(data.email)) {
//     errors.email = "Email field is required";
//   }

//   if (validator.isEmpty(data.password)) {
//     errors.password = "Password field is required";
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };
