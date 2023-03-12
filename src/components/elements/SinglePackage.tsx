import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'


type Props = {
    userToken?:string,
    localtracker: string,
    description?: string,
    status: string,
    recipient?: string,
    country?: string,
    type?: string,
    weight?: string,
    billing?:string,
    tracking?: string
  }


const SinglePackageItem = ({userToken, localtracker,description, recipient, country, type, weight, billing, tracking }: Props) : ReactElement => {

    return (
        <li className='box'>
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
            </div>
        
        </li>
    )

}

export default SinglePackageItem