import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import {useStateContext} from '../../context/StateContext'


type Props = {
    title: string,
    link: string,
    active?: boolean,
  }

const ConnectButton = () : ReactElement => {
    const router = useRouter()
    const data = useStateContext()
    console.log(data)
    return (
        <button className='bg-white' onClick={async () => {
            try {
               if(data?.address){
              data && await data?.disconnect()
              } else{
               data && await data?.connect()
           }
          } catch (err){
             console.log(err)
 
         }
        }}>{data?.address ?  'Disonnect' : 'Connect'}</button>
      )
   }

export default ConnectButton