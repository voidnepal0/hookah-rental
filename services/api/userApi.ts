import { apiClient } from "../axiosInstance";
import type { User, UserApiResponse, UpdateUserRequest } from "@/types/userTypes";

const transformUserResponse = (apiResponse: UserApiResponse): User => ({
  ...apiResponse,
  gender: apiResponse.gender as User['gender'] // Type assertion for gender field
});

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get<UserApiResponse>('/user/me');
    return transformUserResponse(response.data);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const updateUser = async (userData: UpdateUserRequest): Promise<User | null> => {
  try {
    const response = await apiClient.patch<UserApiResponse>('/user/me', userData);
    return transformUserResponse(response.data);
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};
