export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface RegisterResponse {
 access_token: string;
 user:{
    id: string;
    email: string;
    role: string;
 }   
}

export interface LoginResponse {
  success: true,
  message: string,
  data: {
    access_token: string,
    user: {
      id: string,
      email: string,
      role: string,
      role_id: string
    }
  }
}