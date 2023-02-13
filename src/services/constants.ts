import config from '../Config'

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const apiUrl = `${config.serviceUrl}/api`;
export const imageUrl = `${config.serviceUrl}/public/images`;
export const fileUrl = `${config.serviceUrl}/public/files`;

export const server = {
  AUTH_URL: `auth`,
  TOKEN_KEY: `token`,
  CLASS_URL: `class`,
  EXAM_URL: `exam`,
  FILE_URL: `file`
};

export const api_auth = {
  LOGIN_URL: `/loginSession`,
  REGISTER_URL: `/register`,
  JWT_VERIFY: `/`
}

export const api_class = {
  GET_ALL: `/get/all`,
  GET: `/get`,
  NICKNAME: `/nickname`,
  JOIN: `/join`,
  LEAVE: `/leave`,
  CREATE: `/create`,
  EDIT_DETAILS: `/edit/details`,
  EDIT_ROLES: `/edit/roles`,
  ASM_ALL: `/assignment/get/all`,
  ASM_GET: `/assignment/get`,
  ASM_ALL_CLASS: `/assignment/get/all/notification`,
  ASM_CREATE: `/assignment/create`,
  ASM_STD_SUBMIT: `/assignment/submit`,
  ASM_SCORE_SUBMIT: `/assignment/score/submit`,
  ASM_COMMENT: `/assignment/comment`,
  PUBLISH: `/post/publish`,
  COMMENT_POST: `/post/comment`,
  GET_POST: `/post/get`,
}

export const api_file = {
  UPLOAD_FILE: `/upload`,
  UPLOAD_IMAGE: `/upload/img`
}

export const api_exam = {
  GET: `/get`,
  GET_ALL: `/get/all`,
  CREATE: `/create`,
  STD_SUBMIT: `/submit`,
  SUBJ_TEACHER_SCORE: `/score/subjective`,
  TEACHET_GET_RESULT: `/result/teacher`
}

// export const api_post = {
//   POST_ALL: `/post`,
// }