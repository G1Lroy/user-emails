export const parseErrors = (messages: { password: string[]; email: string[]; username: string[] }) => {
  const { email, password, username } = messages;
  let result: string[] = [];

  if (email) result = [...result, ...email.map((msg) => `Email: ${msg}`)];
  if (password) result = [...result, ...password.map((msg) => `Password: ${msg}`)];
  if (username) result = [...result, ...username.map((msg) => `Username: ${msg}`)];

  return result;
};

export const encryptData = (name: string, pass: string) => btoa(`${name}:${pass}`);
