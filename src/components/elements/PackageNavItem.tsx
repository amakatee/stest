import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'


type Props = {
    title: string,
    link: string,
    active?: boolean,
  }

const PackageNavItem = ({ title, link }: Props) : ReactElement => {
    const router = useRouter()
    return (
      <Link href={link}>
        <li  className={router.asPath === `/packagestatus/${link}` ? 'ls active' : 'ls glowy'}>
          {title}
       </li>
      </Link>
      )
   }

export default PackageNavItem