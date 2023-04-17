import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package, Address } from "@prisma/client";


interface PackageForm { 
    localtracker: string,
    description : string
  }
type Props = {
    label: string,
    placeholder: string,
    name:string,
    addressForm: Address,
    setAddressForm: React.Dispatch<React.SetStateAction<Address>>
    
  }

const AddressCustomInput = ({label,placeholder, name, setAddressForm, addressForm } : Props) : ReactElement => {
    
    return (
        <label className='text-xs'> {label}:
            <input
              name={name}
              className="bg-gray-100 border  border-cyan-100 text-gray-900 text-sm rounded-lg focus:border-cyan-500 block w-[90vw] m-auto p-2.5 cursor-not-allowed   text-white  bg-[#132b3a93] mb-2 "
              placeholder={placeholder}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
              setAddressForm({...addressForm, [name]: event.target.value})
             }}
            />
        </label>
       
      )
   }

export default AddressCustomInput
