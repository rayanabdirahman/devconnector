import { injectable } from "inversify";

export interface ProfileService {
  getCurrentUserProfile(_id: string): Promise<any>
}

@injectable()
export class ProfileServiceImpl implements ProfileService {
  async getCurrentUserProfile(_id: string): Promise<any> {
    
  }
}