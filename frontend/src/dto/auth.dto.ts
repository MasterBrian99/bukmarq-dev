export interface AuthRequestI {
  username: string;
  password: string;
}

export interface AuthLoginResponseI {
  jwt: string;
  message: string;
}
