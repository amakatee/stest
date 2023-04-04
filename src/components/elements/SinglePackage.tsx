import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from '@prisma/client'


interface CheckedItem { 
    id: string,
    checked: boolean | null
} 

type Props = {
    packid?: string,
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
    usermessage?: string
  }


const SinglePackageItem = ({ packid, userToken, localtracker,description, recipient, country, type, weight, billing, tracking, checked, handleCheckbox , boxes, usermessage}: Props) : ReactElement => {


 
   


    return (
        <li className='box'>
            <div>
                <input 
                 name={packid}
                 type="checkbox"
                 checked={boxes?.find((box )  => box.id === packid)?.checked as boolean}
                 onChange={(e: React.ChangeEvent<HTMLInputElement> ) =>{ if(handleCheckbox != undefined) {handleCheckbox(e, packid as string)} else { console.log('und')}}}
                 
                />
            </div>
            <div className='single-p-img'>
                <img  src='../box.png' />
            </div>
            <div className='single-p-m'>
               {userToken &&  <p><span>User:</span> {userToken.slice(0, 5)}</p>} 
               {localtracker &&  <p><span>Local tracker:</span> {localtracker}</p>}
               {description &&  <p><span>Description:</span> {description}</p>}
               {weight && <p><span>Weight:</span> {weight}</p>}
               {recipient &&  <p><span>Recipient:</span> {recipient}</p>} 
               {country && <p><span>Country:</span> {country}</p>}
               {type && <p><span>Type:</span> {type}</p>}
               {billing && <p><span>Billing:</span> {billing}</p>}
               {tracking && <p><span>Tracking:</span> {tracking}</p>}
               {usermessage && <p><span> Package Status: </span>{usermessage}</p>}
            </div>
        
        </li>
    )

}

export default SinglePackageItem