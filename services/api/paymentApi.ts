import { apiClient } from "../axiosInstance";
import { SHOP_ID } from "../axiosInstance";
import type { Payment } from "@/types/paymentTypes";

export const getPaymentMethod: () => Promise<Payment[]> = async () => {
  const response = await apiClient.get(`/website/${SHOP_ID}/paymentModes`);
  return response?.data?.items || [];
};
