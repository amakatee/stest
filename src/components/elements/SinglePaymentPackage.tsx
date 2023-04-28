import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from '@prisma/client'
import { api } from "../../utils/api";
import { format } from 'date-fns'
import type { PackingOrder} from '@prisma/client'
import PaymentPackageDetail from '../PaymentPackageDetail'

interface CheckedItem { 
    id: string,
    checked: boolean | null
} 

type Props = {
    packid?: string,
    box?: PackingOrder
    setPackageDetail?:  React.Dispatch<React.SetStateAction<{
        show: boolean;
        id: string;
    }>> | undefined,
    packageDetail:  {
        show: boolean;
        id: string;
    },
    
  }


const SinglePaymentPackage = ({ packid, box, setPackageDetail, packageDetail}: Props) : ReactElement => {


//  const {mutate: deletePackage } = api?.packages.deleteById.useMutation()
   
    console.log(box)

    return (
        <li className='box flex flex-col items-center'>
            <p className='text-xs p-3 flex justify-start w-full' >
              {format(box?.createdAt as Date, 'PPpp')}
            </p>
            <div className='flex items-center justify-between  pb-3 px-4 w-full'>
            <div className='flex items-center gap-2'>
                <input 
                   className="relative float-left  h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent disabled:opacity-60 dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                   name={packid}
                   type="checkbox"
                //  checked={boxes?.find((box )  => box.id === packid)?.checked as boolean}
                //  onChange={(e: React.ChangeEvent<HTMLInputElement> ) =>{ if(handleCheckbox != undefined) {handleCheckbox(e, packid as string)} else { console.log('und')}}}
                />
               <div className='single-p-img p-3'>
                <img className='w-[4rem] '  src='../box.png' />
               </div>

                <div className='single-p-m'>
                <p><span>Billing: </span>{box?.billing}</p>
                <p><span>Type: </span>{box?.type}</p>
                <p><span>Recipient: </span>{box?.recipient}</p>
                <p><span>Country: </span>{box?.country}</p>
               </div>
               </div>
               <button type='button' className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 text-xs" 
               onClick={() => setPackageDetail && setPackageDetail({...packageDetail, show: !packageDetail.show, id:  box?.id ||"" })}
               >
                    details
                </button>    
        

           </div>
           
        
        </li>
    )

}

export default SinglePaymentPackage