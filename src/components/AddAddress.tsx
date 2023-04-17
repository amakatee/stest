import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { api } from '../utils/api'
import type {Address } from '@prisma/client'
import { nanoid } from 'nanoid'
import AddressCustomInput from '../components/elements/AddressCustomInput'
import SubmitButton from '../components/elements/SubmitButton'
import {IoMdClose} from 'react-icons/io'


type Props = {
    setAddressPage: React.Dispatch<React.SetStateAction<boolean>>,
    currentUserId: string,
    setCurrentAddressId: (value: React.SetStateAction<string>) => void,
    addressList: Address[] | undefined,
    setAddressList: React.Dispatch<React.SetStateAction<Address[] | undefined>>
}

const AddAdress = ({addressList, setAddressList, setAddressPage,currentUserId, setCurrentAddressId} : Props) : ReactElement => {
    const ctx = api.useContext();
    const {data: addresses} = api.addresses.getAllAddresses.useQuery()
    const {mutate: addNewAddress} = api.addresses.createAddress.useMutation()
    // const [addressList, setAddressList] = useState<Address[] | undefined>([])
    const [addAddress, setAddAddress ] = useState(false)
    const [formData, setFormData] = useState<Address>({
        id:nanoid(),
        createdAt: new Date,
        ownerId: currentUserId,
        firstName: "",
        secondName: "",
        phone: "",
        zipcode: "",
        country: "",
        fulladdress: ""

    })


    useEffect(() => {
        setAddressList(addresses)

    }, [addresses])
    
    

    return (
        <section className='fixed w-full h-full bg-[#0d171b] text-white z-20 overflow-scroll py-5'>
        

            <p className='w-full flex justify-end pr-4 mb-3' onClick={() => setAddressPage(prev => !prev)}><IoMdClose size={25}/></p>
            <header className='flex flex-col items-center gap-4'>
                <button onClick={() => setAddAddress(prev => !prev)} type='button' className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-4 py-1.5 text-center text-[#18383c] uppercase mt-2 mb-2'>+ Add new Address</button>
                 {addAddress && <form
                 className=''
                     onSubmit={(e) => {
                     e.preventDefault()
                     const newAddress = {
                        ownerId: currentUserId,
                        firstName: formData.firstName as string,
                        secondName: formData.secondName as string,
                        phone: formData.phone as string, 
                        zipcode: formData.zipcode as string ,
                        country: formData.country as string,
                        fulladdress: formData.fulladdress as string
                     }
                     addNewAddress({
                        ownerId: currentUserId,
                        firstName: formData.firstName as string,
                        secondName: formData.secondName as string,
                        phone: formData.phone as string, 
                        zipcode: formData.zipcode as string ,
                        country: formData.country as string,
                        fulladdress: formData.fulladdress as string,

                     })
                     setAddressList([...(addressList || []), newAddress as Address])
                     setAddAddress(prev => !prev)
                    


                 }}>
                     <AddressCustomInput  label="First Name" placeholder='First Name' name="firstName" setAddressForm={setFormData} addressForm={formData} />
                     <AddressCustomInput  label="Second Name" placeholder='Second Name' name="secondName" setAddressForm={setFormData} addressForm={formData} />
                     <AddressCustomInput  label="Phone" placeholder='Phone' name="phone" setAddressForm={setFormData} addressForm={formData} />
                     <AddressCustomInput  label="Zipcode" placeholder='Zipcode' name="zipcode" setAddressForm={setFormData} addressForm={formData} />
                     <AddressCustomInput  label="Country" placeholder='Country' name="country" setAddressForm={setFormData} addressForm={formData} />
                     <AddressCustomInput  label="Full Address" placeholder='Full Address' name="fulladdress" setAddressForm={setFormData} addressForm={formData} />
                     
                     <SubmitButton label="Save Address" />                    
                     </form>}
            </header>
            <main className='flex flex-col  w-[90vw] m-auto  justify-around gap-3 pt-5'>
               { addressList?.length ? [...addressList]?.map(address =>
                <div key={address.id} onClick={() => 
                {
                    setAddressPage(false)
                    setCurrentAddressId(address.id)}
                }
                className=" bg-[#132b3a93] p-3 rounded-lg"
                >   
                    <p className='text-xs'><span className='font-bold'>First Name:  </span>{address.firstName}</p>
                    <p className='text-sm'><span>Second Name :</span>{address.secondName}</p>
                    <p className='text-sm'><span>Address :</span>{address.zipcode}</p>
                    <p className='text-sm'><span>Phone :</span>{address.phone}</p>
                    <p className='text-sm'><span>Country :</span>{address.country}</p>
                    <p className='text-sm'><span>Full Address :</span>{address.fulladdress}</p>
                    </div>) : <div>No addresses yet</div>}
            </main>

        </section>
      
      )
   }

export default AddAdress