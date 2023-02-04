

import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'


type Props = {
    title: string,
    link: string,
    active: boolean,
   
  }
  

const PackageNavItem: React.FC<Props> = ({  title, link, active }) => {
    const router=useRouter()
    
    return (
       <li onClick={() => router.push(`${link}`)} className={router.asPath === `/packagestatus/${link}` ? 'ls active' : 'ls '}>
          {title}
 
          </li>)
  
  
    }

export default PackageNavItem