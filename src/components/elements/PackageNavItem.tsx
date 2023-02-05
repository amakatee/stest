import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'


type Props = {
    title: string,
    link: string,
    active?: boolean,
    changePage: (link: string) => void
   
  }

const PackageNavItem = ({ title, link, changePage }: Props) : ReactElement => {
    const router = useRouter()
    return (
       <li onClick ={()  => changePage(link)} className={router.asPath === `/packagestatus/${link}` ? 'ls active' : 'ls '}>
          {title}
       </li>)
   }

export default PackageNavItem