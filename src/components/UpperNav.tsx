import React, { ReactElement } from 'react'
import { useStateContext } from '../context/StateContext'
import ConnectButton from './elements/ConnectButton'




const UpperNav = () : ReactElement => {
    const data = useStateContext()

    return (
        <div className=' flex justify-between items-center py-3 px-10'>
            <ConnectButton />
             <p >{data?.currentUser?.token.slice(0,7)}</p>
        </div>
      
      )
   }

export default UpperNav