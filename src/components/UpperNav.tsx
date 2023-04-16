import React, { ReactElement } from 'react'
import { useStateContext } from '../context/StateContext'
import ConnectButton from './elements/ConnectButton'




const UpperNav = () : ReactElement => {
    const data = useStateContext()

    return (
        <div className=' flex justify-between items-center py-4 px-9'>
             <p >{data?.currentUser?.token.slice(0,7)}</p>
             <ConnectButton />
        </div>
      
      )
   }

export default UpperNav