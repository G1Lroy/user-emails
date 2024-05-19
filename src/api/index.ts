import { EmailFormValues } from "../pages/Home";
import { RegFormValues } from "../pages/Registration";
import { LocalUser, encryptData } from "../utils";

const BASE_URL = "http://68.183.74.14:4005/api/";

export const register = async (body: RegFormValues) => {
  const response = await fetch(BASE_URL + "users/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
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
  const response = await fetch(BASE_URL + "users/current/", {
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
  const response = await fetch("http://68.183.74.14:4005/swagger/", {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      accept: "application/json",
    },
  });
  return response.status;
};
export const sendEmail = async (values: EmailFormValues, localUser: LocalUser) => {
  const { username, password } = localUser;
  const basicAuth = encryptData(username, password);
  const response = await fetch(BASE_URL + "emails/", {
    method: "POST",
    headers: { Authorization: `Basic ${basicAuth}`, accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return response;
};
export const getEmails = async (username: string, password: string, url: string = BASE_URL + "emails/") => {
  const basicAuth = encryptData(username, password);
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Basic ${basicAuth}`, accept: "application/json" },
  });
  const data = await response.json();
  return data;
};
