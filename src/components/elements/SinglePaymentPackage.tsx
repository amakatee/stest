import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from '@prisma/client'
import { api } from "../../utils/api";
import { format } from 'date-fns'
import type { PackingOrder} from '@prisma/client'
interface CheckedItem { 
    id: string,
    checked: boolean | null
} 

type Props = {
    packid?: string,
    box?: PackingOrder
    
  }


const SinglePaymentPackage = ({ packid, box}: Props) : ReactElement => {


//  const {mutate: deletePackage } = api?.packages.deleteById.useMutation()
   
    console.log(box)

    return (
        <li className='box'>
        
      
            {/* <div>
                <input 
                 name={packid}
                 type="checkbox"
                 checked={boxes?.find((box )  => box.id === packid)?.checked as boolean}
                 onChange={(e: React.ChangeEvent<HTMLInputElement> ) =>{ if(handleCheckbox != undefined) {handleCheckbox(e, packid as string)} else { console.log('und')}}}
                 
                />
            </div> */}


            <div className='single-p-img'>
                <img  src='../box.png' />
            </div>

            <div className='single-p-m'>
                {format(box?.createdAt as Date, 'PPpp')}
                <p><span>Billing: </span>{box?.billing}</p>
                <p><span>Type: </span>{box?.type}</p>
                <p><span>Recipient: </span>{box?.recipient}</p>
                <p><span>Country: </span>{box?.country}</p>
            
            </div>
           
    
           
            <div className='flex flex-col'>
               
                <button type='button'>
                    see detail
                </button>    
            </div>
        
        </li>
    )

}

export default SinglePaymentPackage