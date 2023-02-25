import { type NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import type {ConnectorData} from 'wagmi'
import MainLayout from '../components/MainLayout'

// import { useStateContext } from "../context/StateContext";
import { api } from "../utils/api";
import { useDisconnect, useMetamask, useAddress } from "@thirdweb-dev/react";





interface FormData {
  token: string,
  name: string
}

interface User {
  name: string,
  token: string
}
interface PaymentForm {
 
  title: string,
  description: string
  address: string,
  target:any,
  payment: number,
  image: string,
  

}
interface PackageForm { 
  localtracker: string,
  description : string
}

const Home: NextPage = () => {
  // const {connect, address, disconnet} = useStateContext()
  const connect = useMetamask()
  const address = useAddress()
  const disconnet = useDisconnect()

 


  const utils = api.useContext();
  const [form, setForm] = useState<PaymentForm>({
    title: '',
    description: "helllo",
    address:'',
    target: '',
    payment: .1,
    image:''



  })
  const [ users, setUsers] = useState<User[]>()
  const [formData, setFormaData] = useState<FormData>({
    token: '',
    name: ''
  })


  

  const {data: allUsers, isLoading} = api?.users?.allUsers?.useQuery( 
   
    
  )
 const addUser = api?.users?.newUser?.useMutation({
    onSuccess: (data: any) => {
     console.log(data)
      // setUsers(prev => [...prev, data])
    }
})

  
  useEffect(() => {
    if( address != undefined &&  allUsers != undefined ) {
       const existingUser = allUsers?.find(user => user.token === address)
       if(existingUser) {
        console.log('exists')
        } else {
        console.log('new')
        addUser.mutate({
          token: address , name: "new user" })
      } 
     }
  }, [address, allUsers])

  const [packageForm, setPackageForm] = useState<PackageForm>({
    localtracker: '',
    description: ''
  })


  const addPackage = api?.packages?.newPackage?.useMutation({
    onSuccess: (data: any) => {
      console.log(data)
       // setUsers(prev => [...prev, data])
     }

  })
  

  return (
      <>
         <button onClick={async () => {
           try {
              if(address){
            await disconnet()
             } else{
            await connect()
          }
         } catch (err){
            console.log(err)

        }
       }}>{address ?  'Disonnect' : 'Connect'}</button>
      <main>
        <form className="form-tracker"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          console.log(packageForm.description, packageForm.localtracker)
          addPackage.mutate({localtracker: packageForm.localtracker, description: packageForm.description})

        }}
        >
           <input
           placeholder="local tracking code"
           onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
             setPackageForm({...packageForm, localtracker: event.target.value})

           }}
            />
            <input 
            placeholder="additional info"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPackageForm({...packageForm, description: event.target.value})
            }}
            />
            <button type="submit">Track Package</button>

        </form>



        {/* <form onSubmit={(event : React.FormEvent) => {
          event.preventDefault()
          console.log("hello")
       
          addUser.mutate({
            token: formData.token , name: formData.name
          })

        }}>
        <input 
        placeholder="token"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormaData({...formData, token: e.target.value}) }

        />
        <input 
        placeholder="name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormaData({...formData, name: e.target.value}) }
        />
        <button type="submit">Submiy</button>

        </form> */}

        {users?.map(u => <div key={u.name}>{u.token}</div>)}

       

        <div>{address && address}</div>
        
      </main>
     
      </>
    
  );
};

export default Home;
