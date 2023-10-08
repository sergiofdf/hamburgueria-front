import { Role } from '../../models/Roles';
import { httpClient } from './../httpClient';

interface MeResponse {
  userId: string;
  email: string;
  name: string;
  roles: [Role];
}

export async function me(){
  const { data } = await httpClient.get<MeResponse>('/users/me');
  return data;
}
