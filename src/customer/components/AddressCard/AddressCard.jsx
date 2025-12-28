import React from 'react'

const AddressCard = ({address}) => {
  console.log("ADDRESS:",address)
  return (
    <div>
        <div>
            <p>{address?.firstName + " " + address?.lastName}</p>
            <p>{address?.streetAddress}</p>
            <p>{address?.city + "-" + address?.zipCode + ", " + address?.state}</p>
            <div className='space-y-1'>
                <p className='font-semibold'>Phone Number</p>
                <p>{address?.phoneNumber}</p>
            </div>
        </div>
    </div>
  )
}

export default AddressCard