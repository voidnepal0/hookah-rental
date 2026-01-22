import { useMutation } from "@tanstack/react-query";
import { API_URL} from "../axiosInstance";
import type { Login, Register, LoginResponse, RegisterResponse } from "@/types/authTypes";


export const useLogin = () => {
   return useMutation<LoginResponse, Error, Login>({
     mutationKey: ['Login'],
     mutationFn: async (loginData: Login) => {
        const response = await fetch(`${API_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || 'Login failed. Please check your credentials and try again.';
          throw new Error(errorMessage);
        }
        
        return response.json();
     }
   })
}

export const useRegister = () => {
   return useMutation<RegisterResponse, Error, Register>({
     mutationKey: ['Register'],
     mutationFn: async (registerData: Register) => {
        const response = await fetch(`${API_URL}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || 'Registration failed. Please check your information and try again.';
          throw new Error(errorMessage);
        }
        
        return response.json();
     }
   })
}
