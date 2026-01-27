import { apiClient } from "../axiosInstance";
import type { 
  DeliveryAddress, 
  CreateAddressRequest, 
  UpdateAddressRequest, 
  AddressApiResponse 
} from "@/types/addressTypes";

const transformAddressResponse = (apiResponse: AddressApiResponse): DeliveryAddress => ({
  ...apiResponse,
});

export const getDeliveryAddresses = async (): Promise<DeliveryAddress[]> => {
  try {
    const response = await apiClient.get<{ 
      data: AddressApiResponse[], 
      page: number, 
      limit: number, 
      totalCount: number, 
      totalPages: number 
    }>('/deliveryAddress');
   
    
    // Handle paginated response - extract the data array
    const addresses = response.data?.data || [];
    
    return addresses.map(transformAddressResponse);
  } catch (error) {
    console.error('Error fetching delivery addresses:', error);
    return [];
  }
};

export const createDeliveryAddress = async (addressData: CreateAddressRequest): Promise<DeliveryAddress | null> => {
  try {
    const response = await apiClient.post<AddressApiResponse>('/deliveryAddress', addressData);
    return transformAddressResponse(response.data);
  } catch (error) {
    console.error('Error creating delivery address:', error);
    return null;
  }
};

export const updateDeliveryAddress = async (
  id: string, 
  addressData: UpdateAddressRequest
): Promise<DeliveryAddress | null> => {
  try {
    const response = await apiClient.put<AddressApiResponse>(`/deliveryAddress/${id}`, addressData);
    return transformAddressResponse(response.data);
  } catch (error) {
    console.error('Error updating delivery address:', error);
    return null;
  }
};

export const deleteDeliveryAddress = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/deliveryAddress/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting delivery address:', error);
    return false;
  }
};
