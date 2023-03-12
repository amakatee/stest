import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";


interface PackageForm { 
    localtracker: string,
    description : string
  }
type Props = {
    label: string,
    placeholder: string,
    name:string,
    packageForm: PackageForm,
    setPackageForm:  React.Dispatch<React.SetStateAction<PackageForm>>
  }

const CustomInputMain = ({label,placeholder, name, setPackageForm, packageForm } : Props) : ReactElement => {
    
    return (
        <label> {label}:
            <input
              name={name}
              placeholder={placeholder}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
              setPackageForm({...packageForm, [name]: event.target.value})
             }}
            />
        </label>
       
      )
   }

export default CustomInputMain
