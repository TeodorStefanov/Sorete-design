const usernameValidator = (username) => {
  let usernameError = "";
  if (!username) {
    usernameError = "Please enter your username";
  }
  if (username) {
    usernameError = "";
  }
  return usernameError;
};
const passwordValidator = (password) => {
  let passwordError = "";
  if (!password) {
    passwordError = "Please enter your password";
  }
  if (password) {
    passwordError = "";
  }
  return passwordError;
};
export { usernameValidator, passwordValidator };
