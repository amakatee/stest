import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { Package } from "@prisma/client";

type Props = {
    label: string,
    
  }

const SubmitButton = ({label } : Props) : ReactElement => {
    return (
        <button type="submit">{label}</button>
      )
   }

export default SubmitButton
