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
    status?: string,
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
    createdAt: Date,

  }


const SinglePackageItem = ({ packid,setStorageBoxes,createdAt, storageBoxes, userToken, localtracker,description, recipient, country, type, weight, billing, tracking, checked, handleCheckbox , boxes, usermessage}: Props) : ReactElement => {


 const {mutate: deletePackage } = api?.packages.deleteById.useMutation()
     console.log(status)


    return (
        <li className='box flex flex-col  px-4'>
        <div>
            <div className='flex w-full justify-between items-center py-3'>
                 {createdAt &&  <p className='text-xs'> {format(createdAt, 'PPpp')}</p>}
                <button className='text-xs  ' onClick={() => {
                   setStorageBoxes && setStorageBoxes(storageBoxes?.filter(box => box.id !== packid))
                    deletePackage({id:packid as string})}} 
                    type='button'
                    >Remove</button>
            </div>



            <div className='flex  items-center justify-left gap-3 pb-3 '>
          {status === "DOMESTIC" ? <></> :  <div>
                <input 
                className="relative float-left  h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent disabled:opacity-60 dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                // className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 name={packid}
                 type="checkbox"
                 checked={boxes?.find((box )  => box.id === packid)?.checked as boolean}
                 onChange={(e: React.ChangeEvent<HTMLInputElement> ) =>{ if(handleCheckbox != undefined) {handleCheckbox(e, packid as string)} else { console.log('und')}}}
                 
                />
            </div>
                }

           
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