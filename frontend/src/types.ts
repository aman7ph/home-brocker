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
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  role: string;
}
export interface listingInterface {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  userRef: string;
  _id?: string;
}
