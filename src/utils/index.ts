import * as EmailValidator from "email-validator";

export const inValidEmail = (email: string) => !EmailValidator.validate(email);
export const inValidPassword = (password: string) =>
  /[^\x01-\x7E]/g.test(password) ||
  password?.length < 6 ||
  /[^a-z0-9@#$%&?!]/gi.test(password);
