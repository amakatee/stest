import React, { ReactElement } from 'react'
import { useStateContext } from '../context/StateContext'
import ConnectButton from './elements/ConnectButton'
import { api } from "../utils/api"
import type { PackingOrder} from '@prisma/client'
import {IoMdClose} from 'react-icons/io'
   



interface Props {
    id: string,
    setPackageDetail?:  React.Dispatch<React.SetStateAction<{
      show: boolean;
      id: string;
  }>> | undefined,
  packageDetail:  {
      show: boolean;
      id: string;
  },

  }
  
const PackingPageDetail = ({id, packageDetail, setPackageDetail} : Props) : ReactElement => {
    const data = useStateContext()
    console.log(data?.currentUser?.package)
    console.log(id)
  
    const {data: currentPackage } = api.orders.getPackageById.useQuery({
         id:id
        }) 
   
    console.log(currentPackage)
    const {data:address } = api.addresses.getAddressById.useQuery({
      id: currentPackage?.addressid || ""
    })
    console.log(address)
 //   storageBoxes?.filter((box) =>  !pickedPackages?.includes(box)
    const existingPacks = data?.currentUser?.package?.filter(pack => currentPackage?.packageids?.includes(pack.id))
    console.log(existingPacks, data?.currentUser?.package, currentPackage?.packageids)
    

    return (
        
        <section className="w-full h-full  fixed top-0 left-0 page-detail px-3 py-5 custom-text ">
          <header className='w-full h-[7vh] relative'>
            <p className='absolute right-0 ' onClick={() => setPackageDetail && setPackageDetail({...packageDetail, show: !packageDetail.show})}><IoMdClose size={25}/></p>
          </header>
          <main className='flex flex-col  gap-2 items-left bg-black rounded-md bg-[#4a6171] px-4 py-6'>
            <div className='flex justify-between items-center'>
            <p><span>Order No:</span> {currentPackage?.orderno}</p>
            <p>12.12.200</p>
            </div>

            <div className='flex flex-col gap-3   '>
              {existingPacks?.map(pack => 
              <div className='flex flex-col pack-style px-4 py-3 '>
                <p><span>Local tracking code: </span>{pack.localtracker}</p>
                <p><span>Weight: </span>{pack.weight} g</p>

              </div>
              )}
            </div>
            <div className='flex flex-col'>
              <h1>Address: </h1>
              <p  ><span >Country: </span>{address?.country}</p>
              <p><span>First Name: </span>{address?.firstName}</p>
              <p><span>Second Name: </span>{address?.secondName}</p>
              <p><span>Address: </span>{address?.fulladdress}</p>
              <p><span></span>{address?.zipcode}</p>
            </div>
           
            
          </main>
          
          </section>
       
        )
   }    

export default PackingPageDetail