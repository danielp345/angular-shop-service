export interface User {
  login: string;
  password: string;
}

export interface UserWithId {
  _id: string;
  login: string;
  password: string;
}
