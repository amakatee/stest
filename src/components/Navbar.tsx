import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import {AiFillHome} from "react-icons/ai"
import {BsFillBoxSeamFill} from 'react-icons/bs'
import {FaUser} from "react-icons/fa"




const Navbar = () : ReactElement => {
    const router = useRouter()
    return (
        <ul className='menu'>
           <Link href='/'> <li className='li'> <AiFillHome size="17"/></li></Link>
            <Link href='/packagestatus/domestic'><li className='li'><BsFillBoxSeamFill  size="16" /></li></Link>
            <li className='li '><FaUser  size="15" /></li>
        </ul>
      
      )
   }

export default Navbar