import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../axiosInstance";
import type { Login, Register, LoginResponse, RegisterResponse } from "@/types/authTypes";


export const useLogin = () => {
   return useMutation<LoginResponse, Error, Login>({
     mutationKey: ['Login'],
     mutationFn: async (loginData: Login) => {
        const response = await apiClient.post('/user/login', loginData);
        return response.data;
     }
   })
}

export const useRegister = () => {
   return useMutation<RegisterResponse, Error, Register>({
     mutationKey: ['Register'],
     mutationFn: async (registerData: Register) => {
        const response = await apiClient.post('/user/register', registerData);
        return response.data;
     }
   })
}
