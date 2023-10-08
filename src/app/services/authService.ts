import { Role } from '../models/Roles';
import { httpClient } from './httpClient';

export interface SignupParams {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}
interface SignupResponse {
  userId: string;
  name: string;
  email: string;
  phone_number: string;
  user_active: boolean,
  roles: [Role]
  created_at: string;
  updated_at: string;
}

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  access_token: string;
}


async function signup(params: SignupParams){
  const { data } = await httpClient.post<SignupResponse>('/users', params);
  return data;
}

async function signin(params: SigninParams){
  const { data } = await httpClient.post<SigninResponse>('/login', params);
  return data;
}


export const authService = {
  signup,
  signin
};
