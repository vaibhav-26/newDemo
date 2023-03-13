import { environment } from "../../../environments/environment";
const { endpoint } = environment;

export const API = {
  LOGIN: `${endpoint}/login`,
  GET_ALL_REQUESTS: `${endpoint}/getAllRequests`,
  GET_ALL_USERS: `${endpoint}/get-all-users`,
  VERIFYOTP: `${endpoint}/verify-otp`,
  FORGETPASSWORD: `${endpoint}/reset-password`,

  PROJECT: {
    GET_ALL_PROJECTS: `${endpoint}/projects`,
    REMOVE_PROJECT: `${endpoint}/project/remove`,
  },
};
