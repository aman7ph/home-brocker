export interface userInterface {
  _id: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  updatedAt: Date;
  avatar: string;
  role: string;
}

interface listingInterface {
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
}
