import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from '@prisma/client'
import { api } from "../../utils/api";
import { format } from 'date-fns'

interface CheckedItem { 
    id: string,
    checked: boolean | null
} 

type Props = {
    packid?: string,
    storageBoxes?: Package[] | undefined,
    setStorageBoxes?:React.Dispatch<React.SetStateAction<Package[] | undefined>>
    userToken?:string,
    localtracker: string,
    description?: string,
    status: string,
    recipient?: string,
    country?: string,
    type?: string,
    weight?: number,
    billing?:number,
    tracking?: string,
    checked?: boolean,
    handleCheckbox?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
    boxes?: Package[] | undefined,
    usermessage?: string,
    createdAt: Date
  }


const SinglePackageItem = ({ packid,setStorageBoxes,createdAt, storageBoxes, userToken, localtracker,description, recipient, country, type, weight, billing, tracking, checked, handleCheckbox , boxes, usermessage}: Props) : ReactElement => {


 const {mutate: deletePackage } = api?.packages.deleteById.useMutation()
   


    return (
        <li className='box flex flex-col  px-4'>
        <div>
            <div className='flex w-full justify-between items-center py-3'>
                  <p className='text-xs'> {format(createdAt as Date, 'PPpp')}</p>
                <button className='text-xs  ' onClick={() => {
                   setStorageBoxes && setStorageBoxes(storageBoxes?.filter(box => box.id !== packid))
                    deletePackage({id:packid as string})}} 
                    type='button'
                    >Remove</button>
            </div>



            <div className='flex  items-center justify-left gap-3 pb-3 '>
            <div>
                <input 
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 name={packid}
                 type="checkbox"
                 checked={boxes?.find((box )  => box.id === packid)?.checked as boolean}
                 onChange={(e: React.ChangeEvent<HTMLInputElement> ) =>{ if(handleCheckbox != undefined) {handleCheckbox(e, packid as string)} else { console.log('und')}}}
                 
                />
            </div>

           
            <div className='single-p-img grid place-center'>
                <img className='w-[4rem]' src='../box.png' />
            </div>
            <div className='single-p-m flex flex-col items-start justify-around'>
               {userToken &&  <p><span>User:</span> {userToken.slice(0, 5)}</p>} 
               {localtracker &&  <p><span>Local tracker:</span> {localtracker}</p>}
               {description &&  <p><span>Description:</span> {description}</p>}
               {weight && <p><span>Weight:</span> {weight} g</p>}
               {recipient &&  <p><span>Recipient:</span> {recipient}</p>} 
               {country && <p><span>Country:</span> {country}</p>}
               {type && <p><span>Type:</span> {type}</p>}
               {billing !==0 && <p><span>Billing:</span> {billing} $</p>}
               {tracking && <p><span>Tracking:</span> {tracking}</p>}
               {usermessage && <p><span> Package Status: </span>{usermessage}</p>}
            </div>
       

            </div>
           
          
              

           </div>       
            
        
        </li>
    )

}

export default SinglePackageItem