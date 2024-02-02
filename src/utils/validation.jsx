export const validateDate = (email, password, username) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isUsernameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username);

  if (!isUsernameValid) return "Username is not valid";
  if (!isEmailValid) return "Email is not valid";

  if (!isPasswordValid)
    return `Your password must be have at least 8 characters long 1 uppercase & 1 lowercase character 1 number`;
  return null;
};
