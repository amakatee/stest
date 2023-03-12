import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";

type Props = {
    label: string,
    name: string,
    id: string,
    placeholderValue: string,
    property: string | null | undefined,
    setFormData: (value: React.SetStateAction<Package[] | undefined>) => void,
    formData: Package[]
  }

const CustomInput = ({label, name, id, placeholderValue ,  property, setFormData, formData } : Props) : ReactElement => {
    const [s , seS] = useState<string | null >('d')
   

   
    
   
    return (
        <label>{label}: 
            <input
                name="weight"
                value={property as string || ""}
                placeholder={placeholderValue}
                onChange={(e:  React.ChangeEvent<HTMLInputElement>) => {
                    setFormData(formData.map( item => {
                        if(item.id === id) {
                            Object.entries(item).map(([key, value]) => {
                              console.log(key)
                            })
                          
                            return {...item, [name]: e.target.value }
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
