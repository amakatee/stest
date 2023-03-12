import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import type {ConnectorData} from 'wagmi'
import MainLayout from '../components/MainLayout'

// import { useStateContext } from "../context/StateContext";
import { api } from "../utils/api";
import { useDisconnect, useMetamask, useAddress } from "@thirdweb-dev/react";
import {useStateContext } from '../context/StateContext'





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

interface ExistingUser {
  id: string,
  name: string,
  role: string,
  token: string,
  package: any


}

const Home: NextPage = () => {
  // const {connect, address, disconnet} = useStateContext()
  // const connect = useMetamask()
  const address = useAddress()
  const disconnet = useDisconnect()

  const data = useStateContext()
 
  
  const utils = api.useContext();

  const [ users, setUsers] = useState<User[]>()
  const {data: allUsers, isLoading} = api?.users?.allUsers?.useQuery( 
   
  )
  const currentUser = allUsers?.find(user => user.token === address)
  console.log(currentUser)
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
        console.log(existingUser)
        // setExistingUser(existingUser)
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
  
  const {data: allPackages} = api?.packages?.allPackages?.useQuery()
  console.log(allPackages)


  return (
      <>
         <button onClick={async () => {
           try {
              if(address){
            await disconnet()
             } else{
              data?.connect && await data?.connect()
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
          if(currentUser != undefined ) {
            addPackage.mutate({localtracker: packageForm.localtracker, description: packageForm.description, ownerId:  currentUser?.id   })


          } else {
            console.log("no user")

          }

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



       
    

        {users?.map(u => <div key={u.name}>{u.token}</div>)}

       

        <div>{address && address}</div>
        <Link href='admin/manage'>to admin</Link>
        
      </main>
     
      </>
    
  );
};

export default Home;
