const emailValidator = (email) => {
  let errorEmail = "";
  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailRegEx.test(email)) {
    errorEmail = "Please enter correct email address";
  }
  if (!email) {
    errorEmail = "Please enter your email";
  }
  if (email && emailRegEx.test(email)) {
    errorEmail = "";
  }
  return errorEmail;
};
const usernameValidator = (username) => {
  let errorUsername = "";
  const usernameRegEx = new RegExp(/^[a-z0-9_.]+$/);
  if (!usernameRegEx.test(username)) {
    errorUsername =
      "Username can only contain english letters, numbers, underscores and dots!";
  }
  if (username.length < 8) {
    errorUsername = "Username must be at least 8 characters long !";
  }
  if (!username) {
    errorUsername = "Please enter your username";
  }
  if (username && username.length >= 8 && usernameRegEx.test(username)) {
    errorUsername = "";
  }
  return errorUsername;
};
const passwordValidator = (password) => {
  let errorPassword = "";
  const passwordRegEx = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );
  if (!passwordRegEx.test(password)) {
    errorPassword =
      "Password must contain minimum eight characters, at least one letter, one number and one special character!";
  }
  if (!password) {
    errorPassword = "Please enter your password";
  }
  if (password && passwordRegEx.test(password)) {
    errorPassword = "";
  }
  return errorPassword;
};
const rePasswordValidator = (password, repassword) => {
  let errorRePassword = "";
  if (password !== repassword) {
    errorRePassword = "Both passwords must match!";
  }
  if (password === repassword) {
    errorRePassword = "";
  }
  return errorRePassword;
};
const firstNameValidator = (firstName) => {
  let errorFirstName = "";
  if (!firstName) {
    errorFirstName = "Please enter your First Name";
  }
  if (firstName) {
    errorFirstName = "";
  }
  return errorFirstName;
};
const familyNameValidator = (familyName) => {
  let errorFamilyName = "";
  if (!familyName) {
    errorFamilyName = "Please enter your Family Name";
  }
  if (familyName) {
    errorFamilyName = "";
  }
  return errorFamilyName;
};
const phoneNumberValidator = (phoneNumber) => {
  let errorPhoneNumber = "";
  const phoneNumberRegEx = new RegExp(/^\d+$/);
  if (phoneNumber.length < 3 || phoneNumber.length > 32) {
    errorPhoneNumber = "Phone Number must be between 3 and 32 symbols";
  }
  if (!phoneNumberRegEx.test(phoneNumber)) {
    errorPhoneNumber = "Please enter correct phone number";
  }
  if (!phoneNumber) {
    errorPhoneNumber = "Please enter your Phone Number";
  }
  if (
    phoneNumber &&
    phoneNumberRegEx.test(phoneNumber) &&
    (phoneNumber.length >= 3) & (phoneNumber.length <= 32)
  ) {
    errorPhoneNumber = "";
  }
  return errorPhoneNumber;
};
export {
  emailValidator,
  usernameValidator,
  passwordValidator,
  rePasswordValidator,
  firstNameValidator,
  familyNameValidator,
  phoneNumberValidator,
};
