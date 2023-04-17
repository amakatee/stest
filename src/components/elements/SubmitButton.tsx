import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";

type Props = {
    label: string,
    
  }

const SubmitButton = ({label } : Props) : ReactElement => {
    return (
        <button className=' text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-4 py-1.5 text-center text-[#18383c] uppercase mt-2 mb-2' type="submit">{label}</button>
      )
   }

export default SubmitButton
