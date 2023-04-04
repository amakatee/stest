import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";
import { string } from 'zod';

type Props = {
    label: string,
    name: string,
    id: string,
    placeholderValue: string,
    property:  number | null,
    setFormData: (value: React.SetStateAction<Package[] | undefined>) => void,
    formData: Package[]
  }

const CustomInput = ({label, name, id, placeholderValue ,  property, setFormData, formData } : Props) : ReactElement => {
   
   

   
    
   
    return (
        <label>{label}: 
            <input
                name={name}
                type="number"
                value={property as number}
                placeholder={placeholderValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => {
                    setFormData(formData.map( item => {
                        if(item.id === id) {
                            Object.entries(item).map(([key, value]) => {
                              console.log(key, value)
                            })
                          
                            return {...item, [name]: e.target.valueAsNumber  }
                        } else {
                            return item
                        }
                    }))
                 }}
                />
        
     </label>
      )
   }

export default CustomInput
