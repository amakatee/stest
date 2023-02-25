import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'




const Navbar = () : ReactElement => {
    const router = useRouter()
    return (
        <ul className='menu'>
           <Link href='/'> <li>home</li></Link>
            <Link href='/packagestatus/domestic'><li>my packages</li></Link>
            <li>account</li>
        </ul>
      
      )
   }

export default Navbar