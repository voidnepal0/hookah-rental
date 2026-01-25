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
    console.log('Fetching delivery addresses...');
    const response = await apiClient.get<{ 
      data: AddressApiResponse[], 
      page: number, 
      limit: number, 
      totalCount: number, 
      totalPages: number 
    }>('/deliveryAddress');
    console.log('Delivery addresses response:', response.data);
    
    // Handle paginated response - extract the data array
    const addresses = response.data?.data || [];
    console.log('Extracted addresses:', addresses);
    
    return addresses.map(transformAddressResponse);
  } catch (error) {
    console.error('Error fetching delivery addresses:', error);
    return [];
  }
};

export const createDeliveryAddress = async (addressData: CreateAddressRequest): Promise<DeliveryAddress | null> => {
  try {
    console.log('Creating delivery address:', addressData);
    const response = await apiClient.post<AddressApiResponse>('/deliveryAddress', addressData);
    console.log('Created address response:', response.data);
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
    console.log(`Updating delivery address ${id}:`, addressData);
    const response = await apiClient.put<AddressApiResponse>(`/deliveryAddress/${id}`, addressData);
    console.log('Updated address response:', response.data);
    return transformAddressResponse(response.data);
  } catch (error) {
    console.error('Error updating delivery address:', error);
    return null;
  }
};

export const deleteDeliveryAddress = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting delivery address: ${id}`);
    await apiClient.delete(`/deliveryAddress/${id}`);
    console.log('Address deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting delivery address:', error);
    return false;
  }
};
