import React from 'react'

const AddressCard = ({ address, isSelected = false }) => {
  // address is expected to be an object with optional top-level firstName/lastName
  // and an `addresses` array where each addr may also have firstName/lastName
  const addr = address?.addresses && address.addresses.length > 0 ? address.addresses[0] : null
  const ownerName = [addr?.firstName ?? address?.firstName, addr?.lastName ?? address?.lastName].filter(Boolean).join(' ')
  if (!addr) {
    return (
      <div className="border rounded-md p-4 bg-white shadow-sm">
        <p className="text-sm text-gray-500">No address available</p>
      </div>
    )
  }

  return (
    <div className={`border rounded-md p-4 bg-white shadow-sm cursor-pointer ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}>
      <div className="mb-2">
        <p className="font-semibold">{ownerName || 'Unknown'}</p>
      </div>
      <div className="text-sm text-gray-700 mb-2">
        <p>{addr.streetAddress}</p>
        <p>{addr.city}{addr.zipCode ? ` - ${addr.zipCode}` : ''}{addr.state ? `, ${addr.state}` : ''}</p>
      </div>
      <div className='space-y-1 text-sm'>
        <p className='font-semibold'>Phone Number</p>
        <p>{addr.phoneNumber || '—'}</p>
      </div>
    </div>
  )
}

export default AddressCard