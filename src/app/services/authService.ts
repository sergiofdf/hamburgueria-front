import { Roles } from '../models/roles';
import { httpClient } from './httpClient';

interface SignupParams {
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
  roles: [Roles]
  created_at: string;
  updated_at: string;
}

async function signup(params: SignupParams){
  const { data } = await httpClient.post<SignupResponse>('/users', params);

  return data;
}


export const authService = {
  signup,
};
