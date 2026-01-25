export interface DeliveryAddress {
  id: string
  addressName: string
  address: string
  streetName?: string
  houseNumber?: string
  mapLink?: string
  coordinates?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateAddressRequest {
  addressName: string
  address: string
  streetName?: string
  houseNumber?: string
  mapLink?: string
  coordinates?: string
}

export interface UpdateAddressRequest {
  addressName?: string
  address?: string
  streetName?: string
  houseNumber?: string
  mapLink?: string
  coordinates?: string
}

export interface AddressApiResponse {
  id: string
  addressName: string
  address: string
  streetName?: string
  houseNumber?: string
  mapLink?: string
  coordinates?: string
  userId?: string
  createdAt: string
  updatedAt: string
}
