import { RegFormValues } from "../pages/Registration";
import { encryptData } from "../utils";

const BASE_URL = "http://68.183.74.14:4005/";

export const register = async (body: RegFormValues) => {
  const response = await fetch(BASE_URL + "api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status > 201) {
    return {
      status: response.status,
      message: data,
    };
  }
  return {
    status: response.status,
    data,
    message: "Register OK",
  };
};
export const getUser = async (username: string, password: string) => {
  const basicAuth = encryptData(username, password);
  const response = await fetch("http://68.183.74.14:4005/api/users/current/", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  const data = await response.json();
  return data;
};
export const login = async (username: string, password: string) => {
  const basicAuth = encryptData(username, password);

  const response = await fetch(BASE_URL + "swagger/", {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      accept: "application/json",
    },
  });

  return response.status;
};
