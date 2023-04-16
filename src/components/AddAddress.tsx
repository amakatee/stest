import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../utils/api'
import type {Address } from '@prisma/client'
import { nanoid } from 'nanoid'
import { useStateContext } from '../context/AuthContext'
import { previousDay } from 'date-fns'

// type Address = {
//     firstName: string,
//     secondName: string,
//     phone: string,
//     zipcode: string,
//     country: string,
//     fulladdress: string
// }


type Props = {
    setAddressPage: React.Dispatch<React.SetStateAction<boolean>>,
    currentUserId: string,
    setCurrentAddressId: (value: React.SetStateAction<string>) => void
}

const AddAdress = ({setAddressPage,currentUserId, setCurrentAddressId} : Props) : ReactElement => {
    const ctx = api.useContext();
    const {data: addresses} = api.addresses.getAllAddresses.useQuery()
    const {mutate: addNewAddress} = api.addresses.createAddress.useMutation()
    const [addressList, setAddressList] = useState<Address[] | undefined>([])
    const [addAddress, setAddAddress ] = useState(true)
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

    console.log(currentUserId)
    useEffect(() => {
        setAddressList(addresses)

    }, [addresses])
    
    

    return (
        <section className='fixed w-full h-full bg-white text-black z-20 '>
            hello addrtess

            <p onClick={() => setAddressPage(prev => !prev)}>close</p>
            <header>
                <button onClick={() => setAddAddress(prev => !prev)} type='button'>Add new Address</button>
                 {addAddress && <form onSubmit={(e) => {
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
                    


                 }}>
                     <input 
                     type="text"
                     placeholder='firstName'
                     value={formData.firstName as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, firstName: e.target.value}) }

                     />
                     <input 
                     type="text"
                     placeholder='second name'
                     value={formData.secondName as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, secondName: e.target.value}) }
        
                     />
                     <input 
                     type="text"
                     placeholder='phone'
                     value={formData.phone as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value}) }

                     />
                     <input 
                     type="text"
                     placeholder='zip'
                     value={formData.zipcode as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, zipcode: e.target.value}) }

                     />
                      <input 
                     type="text"
                     placeholder='country'
                     value={formData.country as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, country: e.target.value}) }

                     />
                     <input 
                     type="text"
                     placeholder='full address'
                     value={formData.fulladdress as string}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, fulladdress: e.target.value}) }

                     />
                     <button type='submit'> save address</button>
                     heres  an address 
                     </form>}
            </header>
            <main>
               { addressList?.length ? [...addressList]?.map(address => <div key={address.id} onClick={() => 
                {
                    setAddressPage(false)
                    setCurrentAddressId(address.id)}
                }>{address.country}</div>) : <div>No addresses yet</div>}
            </main>

        </section>
      
      )
   }

export default AddAdress