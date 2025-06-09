import { AxiosInstance, AxiosResponse } from 'axios';
import { INVITE_USER } from '../../endpoints/authentication';

export interface InviteUserResponse {
  message: string;
}

export class InviteUserAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  inviteUser = async (
    name: string,
    email: string,
    phone:number,
    role: number,
    createdBy:number
  ): Promise<AxiosResponse<InviteUserResponse>> => {
    try {
      const response = await this.api.post(INVITE_USER, {
        
          firstName:name,
          officialEmail:email,
          primaryPhone:phone,
          roleId:role,
          createdBy:{
            id: createdBy
          },
        
      });

      return response;
    } catch (error) {
      console.error('Invite User error:', error);
      throw error;
    }
  };
}
