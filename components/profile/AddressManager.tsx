'use client'

import React, { useState, useEffect } from 'react'
import { 
  getDeliveryAddresses, 
  createDeliveryAddress, 
  updateDeliveryAddress, 
  deleteDeliveryAddress 
} from '@/services/api/addressApi'
import { MapPin, Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react'
import type { DeliveryAddress, CreateAddressRequest, UpdateAddressRequest } from '@/types/addressTypes'
import toast from 'react-hot-toast'

interface AddressFormProps {
  addressId?: string
  formData: CreateAddressRequest | UpdateAddressRequest
  onInputChange: (field: keyof CreateAddressRequest, value: string) => void
  onSave: (id?: string) => void
  onCancel: () => void
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  addressId, 
  formData, 
  onInputChange, 
  onSave, 
  onCancel 
}) => (
  <div className="rounded-xl border-2 p-6 mb-6 shadow-sm"
    style={{
      backgroundColor: "var(--bg-secondary)",
      borderColor: "var(--border-color)"
    }}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Address Name *
        </label>
        <input
          type="text"
          value={formData.addressName || ''}
          onChange={(e) => onInputChange('addressName', e.target.value)}
          placeholder="e.g., Home, Office"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Address *
        </label>
        <input
          type="text"
          value={formData.address || ''}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Main address"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Street Name
        </label>
        <input
          type="text"
          value={formData.streetName || ''}
          onChange={(e) => onInputChange('streetName', e.target.value)}
          placeholder="Street name"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          House Number
        </label>
        <input
          type="text"
          value={formData.houseNumber || ''}
          onChange={(e) => onInputChange('houseNumber', e.target.value)}
          placeholder="House/Flat number"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Map Link
        </label>
        <input
          type="url"
          value={formData.mapLink || ''}
          onChange={(e) => onInputChange('mapLink', e.target.value)}
          placeholder="Google Maps link"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Coordinates
        </label>
        <input
          type="text"
          value={formData.coordinates || ''}
          onChange={(e) => onInputChange('coordinates', e.target.value)}
          placeholder="e.g., 27.7172,85.3240"
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>
    </div>

    <div className="flex gap-3 mt-6">
      <button
        onClick={() => onSave(addressId)}
        className="flex bg-primary items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer "
       
      >
        <Save size={18} />
        Save Address
      </button>
      <button
        onClick={onCancel}
        className="flex items-center gap-2 px-6  rounded-xl font-semibold transition-all duration-300 cursor-pointer border-2 "
        style={{
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
      >
        <X size={18} />
        Cancel
      </button>
    </div>
  </div>
)

const AddressManager = () => {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<CreateAddressRequest | UpdateAddressRequest>({})

  const fetchAddresses = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const addressList = await getDeliveryAddresses()
      console.log('Addresses fetched:', addressList)
      setAddresses(addressList)
      // Remove the toast for no addresses - it's not needed in profile
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch addresses'
      setError(errorMessage)
      toast.error('Could not load your addresses. Please refresh the page. 🔄')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleEdit = (address: DeliveryAddress) => {
    setEditingId(address.id)
    setFormData({
      addressName: address.addressName,
      address: address.address,
      streetName: address.streetName,
      houseNumber: address.houseNumber,
      mapLink: address.mapLink,
      coordinates: address.coordinates
    })
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    setFormData({
      addressName: '',
      address: '',
      streetName: '',
      houseNumber: '',
      mapLink: '',
      coordinates: ''
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAddingNew(false)
    setFormData({})
  }

  const handleSave = async (id?: string) => {
    try {
      let success = false
      
      if (id) {
        // Update existing address
        const result = await updateDeliveryAddress(id, formData as UpdateAddressRequest)
        success = !!result
        if (success) {
          toast.success('Address updated successfully! 🏠')
        }
      } else {
        // Add new address
        const result = await createDeliveryAddress(formData as CreateAddressRequest)
        success = !!result
        if (success) {
          toast.success('New address added successfully! 📍')
        }
      }

      if (success) {
        handleCancel()
        await fetchAddresses()
      } else {
        toast.error('Failed to save address. Please check your input and try again. ❌')
      }
    } catch (error) {
      console.error('Error saving address:', error)
      toast.error('An unexpected error occurred. Please try again. ❌')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const success = await deleteDeliveryAddress(id)
        if (success) {
          toast.success('Address deleted successfully! 🗑️')
          await fetchAddresses()
        } else {
          toast.error('Failed to delete address. Please try again. ❌')
        }
      } catch (error) {
        console.error('Error deleting address:', error)
        toast.error('An unexpected error occurred while deleting. Please try again. ❌')
      }
    }
  }

  const handleInputChange = (field: keyof CreateAddressRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "var(--text-secondary)" }}>Error: {error}</p>
        <button 
          onClick={fetchAddresses}
          className="mt-4 px-4 py-2 rounded-lg"
          style={{ backgroundColor: "var(--primary)", color: "var(--text-primary)" }}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0  font-poppins justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Delivery Addresses
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Manage your delivery addresses for quick checkout
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex bg-primary items-center max-w-[210px] gap-2 px-4 py-2   rounded-xl font-semibold transition-all duration-300 cursor-pointer  shadow-sm"
          
        >
          <Plus size={20} />
          Add New Address
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }}
            ></div>
            <p style={{ color: "var(--text-secondary)" }}>Loading your addresses...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {isAddingNew && (
            <AddressForm
              formData={formData}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          {/* Debug info */}
          

          {addresses.length === 0 && !isAddingNew ? (
            <div className="text-center py-16 rounded-2xl border-2"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)"
              }}
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MapPin size={40} style={{ color: "var(--primary)" }} />
              </div>
              <h4 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                No delivery addresses yet
              </h4>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
                Add your first delivery address to make checkout faster and more convenient
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--text-primary)",
                }}
              >
                <Plus size={18} />
                Add Your First Address
              </button>
            </div>
          ) : (
            addresses.map((address) => (
              <div key={address.id}>
                {editingId === address.id ? (
                  <AddressForm
                    addressId={address.id}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                ) : (
                  <div className="rounded-xl  border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)"
                    }}
                  >
                    <div className="flex items-start  justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <MapPin size={20} style={{ color: "var(--text-primary)" }} />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                              {address.addressName}
                            </h4>
                            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                              {address.address}
                            </p>
                          </div>
                        </div>
                        
                        {(address.streetName || address.houseNumber) && (
                          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                            <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                            <span>
                              {address.streetName && `${address.streetName}`}
                              {address.streetName && address.houseNumber && ', '}
                              {address.houseNumber && `House ${address.houseNumber}`}
                            </span>
                          </div>
                        )}

                        {address.mapLink && (
                          <a 
                            href={address.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105"
                            style={{ 
                              backgroundColor: "var(--primary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <ExternalLink size={16} />
                            View on Map
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(address)}
                          className="p-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110"
                          style={{ 
                            backgroundColor: "var(--bg-primary)",
                            color: "var(--text-primary)",
                          }}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-110"
                          style={{ 
                            backgroundColor: "#ef4444",
                            color: "white",
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default AddressManager
