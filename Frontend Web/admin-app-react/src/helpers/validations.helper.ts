/* eslint-disable no-empty-character-class */
/* eslint-disable no-useless-escape */

export const EMAIL_REGEX =
  /^[^.\W](?!.*\.\.)[a-zA-Z0-9._+-/]{1,64}@[a-zA-Z0-9-.]+(\.[a-zA-Z]{2,}){1}$/g;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g;

export const requireRules = (message: string) => [
  {
    required: true,
    message: message,
  },
];

export const emailRules = (message: string) => [
  {
    pattern: EMAIL_REGEX,
    message: message,
  },
];

export const passwordRules = (message: string) => [
  {
    pattern: PASSWORD_REGEX,
    message: message,
  },
];
