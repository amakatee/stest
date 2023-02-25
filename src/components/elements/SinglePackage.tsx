import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'


type Props = {
    
    owner: string,
    status: string,
    recipient?: string,
    country?: string,
    type?: string,
    weight?: string,
    billing?:string,
    tracking?: string
  }


const SinglePackageItem = ({owner, recipient, country, type, weight, billing, tracking }: Props) : ReactElement => {

    return (
        <li className='box'>
            <div className='single-p-img'>
                <img  src='../box.png' />
            </div>
            <div className='single-p-m'>
               {owner &&  <p><span>Owner:</span> {owner}</p>}
               {weight && <p><span>Weight:</span> {weight}</p>}
               {recipient &&  <p><span>Recipient:</span> {recipient}</p>} 
               {country && <p><span>Country:</span> {country}</p>}
               {type && <p><span>Type:</span> {type}</p>}
               {billing && <p><span>Billing:</span> {billing}</p>}
               {tracking && <p><span>Tracking:</span> {tracking}</p>}
            </div>
        
        </li>
    )

}

export default SinglePackageItem