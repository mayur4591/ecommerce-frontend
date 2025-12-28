import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard'

const AddressesList = ({ address, onSelect, selectedId: controlledSelectedId }) => {
  // `address` is expected to be an object that may contain `addresses` array
  const addresses = address?.addresses || []

  const [selectedId, setSelectedId] = useState(controlledSelectedId || null)

  useEffect(() => {
    if (controlledSelectedId !== undefined) setSelectedId(controlledSelectedId)
  }, [controlledSelectedId])

  if (!addresses.length) {
    return <p className="text-sm text-gray-500">No saved addresses found.</p>
  }

  const handleSelect = (addr, id) => {
    setSelectedId(id)
    if (onSelect) onSelect(addr)
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {addresses.map((addr, idx) => {
        const id = addr.id ?? idx
        const item = {
          // prefer per-address name if available, otherwise fall back to top-level user name
          firstName: addr?.firstName ?? address?.firstName,
          lastName: addr?.lastName ?? address?.lastName,
          addresses: [addr],
        }

        // Debug logs to inspect address object structure when names are incorrect
        // Remove these logs after debugging
        // eslint-disable-next-line no-console
        // eslint-disable-next-line no-console

        return (
          <div key={id} onClick={() => handleSelect(addr, id)}>
            <AddressCard address={item} isSelected={selectedId === id} />
          </div>
        )
      })}
    </div>
  )
}

export default AddressesList
