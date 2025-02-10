import { Role } from "src/user/enums/role.enum";

export interface ActiveUserData {
  
    sub: number;
    email: string;
    role: Role;
    name: string;
    userId: number;
  }
