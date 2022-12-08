const emailValidator = (email) => {
  let errorEmail = "";
  const emailRegEx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailRegEx.test(email)) {
    errorEmail = "Please enter correct email address";
  }
  if (!email) {
    errorEmail = "Please enter your Еmail";
  }
  if (email && emailRegEx.test(email)) {
    errorEmail = "";
  }
  return errorEmail;
};
const nameValidator = (firstName) => {
  let errorFirstName = "";
  if (!firstName) {
    errorFirstName = "Please enter your Name";
  }
  if (firstName) {
    errorFirstName = "";
  }
  return errorFirstName;
};
const messageValidator = (firstName) => {
  let errorFirstName = "";
  if (!firstName) {
    errorFirstName = "Please enter your Message";
  }
  if (firstName) {
    errorFirstName = "";
  }
  return errorFirstName;
};
export { emailValidator, nameValidator, messageValidator };
