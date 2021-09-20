import { Address } from './address';

export interface LoginData{
  email: string;
  password: string
}
export interface UserBasicData extends LoginData{
  role: string;
  active: boolean;
}
export interface User extends UserBasicData{
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: File | null;
}
export interface UserWithAddress extends User, Address{
}
