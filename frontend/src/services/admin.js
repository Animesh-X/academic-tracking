import axios from "axios";

const baseUrl = "http://localhost:3653/api";

let token  = null;
let config = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    config = {
      headers: {
        Authorization: token,
      },
    };
};

const createAdmin = async (credentials) => {
    const response = await axios.post(baseUrl + "/admin", credentials, config);
    return response.data;
}

const createUser = async (credentials) => {
    const response = await axios.post(baseUrl + "/users", credentials, config);
    return response.data;
}

const addDepartment = async (departmentDetails) => {
  const response = await axios.post(baseUrl + "/departments", departmentDetails, config);
  return response.data;
}

const addSession = async (sessionDetails) => {
  const response = await axios.post(baseUrl + "/sessions", sessionDetails, config);
  return response.data;
}

export default { setToken, createAdmin, createUser, addDepartment, addSession};