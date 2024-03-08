// Define your interface
export interface RouerInt {
  path: string;
  element: React.ReactElement;
  children?: RouerInt[];
}

export interface signUpInterface {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface signInInterface {
  email: string;
  password: string;
}

export interface userInterface {
  username: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}
