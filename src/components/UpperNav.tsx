import React, { ReactElement } from 'react'
import { useStateContext } from '../context/StateContext'
import ConnectButton from './elements/ConnectButton'




const UpperNav = () : ReactElement => {
    const data = useStateContext()

    return (
        <div className='text-white flex justify-around items-center py-3'>
            <ConnectButton />
             <p >{data?.currentUser?.token.slice(0,7)}</p>
        </div>
      
      )
   }

export default UpperNav