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
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
}
export interface UserWithAddress extends User, Address{
}
