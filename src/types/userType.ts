export type UserSessionType = {
  id: string;
  jwt: string;
}
export type UserType = {
  id: string;
  role?: number;
  fullname?: string;
  userRole?: string;
  city?: string;
  status?: boolean;
  phone?: string;
  username?: string;
  bloodgroup?: string;
  gender?: boolean;
  age?: string;
  address?: string;
}