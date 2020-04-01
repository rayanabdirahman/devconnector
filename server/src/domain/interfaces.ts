export interface SignUpModel {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginModel {
  email: string;
  password: string;
}
