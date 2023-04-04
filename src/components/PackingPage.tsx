import React, { ReactElement } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";


type Props = {
    setPackingPage: React.Dispatch<React.SetStateAction<boolean>>,
    pickedPackages: Package[] | undefined
    
  }


const PackingPage = ({setPackingPage, pickedPackages} : Props) : ReactElement => {
  
    return (
        <div className='pack'>
            packingPage
            {pickedPackages?.map(pack => pack.localtracker)}
            pickedPackages
          
        </div>
      
      )
   }

export default PackingPage