export class ApiException extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
  }
}

export const CODES = {
  BADREQUEST: 400,
  UNKNOWNERROR: 500,
  SUCCESS: 200,
  PARAM_ERROR: 10007,
  AUTH: {
    USER_NOT_FOUND_OR_INVALID_PWD: 10001,
    LOGIN_INVALID: 10002,
    USER_EXIST: 10003,
    USER_NOT_EXIST: 10004,
    PASSWORD_INVALID: 10005,
    UNKNOWN_LOGIN_TYPE: 10006,
    MESSAGE_CODE_INVALID: 10007,
    MESSAGE_CODE_NOT_EXIST: 10008,
  },
};
