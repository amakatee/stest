import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import type {ConnectorData} from 'wagmi'
import CustomInputMain from "../components/elements/CustomInputMain";
import { api } from "../utils/api";
import {useStateContext } from '../context/StateContext'
import ConnectButton from "../components/elements/ConnectButton";
import SubmitButtton from '../components/elements/SubmitButton'

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

  const data = useStateContext()
  const addUser = api?.users?.newUser?.useMutation({
    onSuccess: (data: any) => {
     console.log(data)
      // setUsers(prev => [...prev, data])
    }
  })

  const ctx = api.useContext();
  const addPackage = api?.packages?.newPackage?.useMutation({
    onSuccess: async () => {
      await  ctx.packages.allPackages.invalidate()
     }

  })
  useEffect(() => {
    if( data?.address != undefined &&  data?.allUsers != undefined ) {
       const existingUser = data?.allUsers?.find(user => user.token === data?.address)
       if(existingUser) {
        console.log('exists')
        console.log(existingUser)
    
        } else {
        console.log('new')
        addUser.mutate({
          token: data?.address , name: "new user" })
      } 
     }
  }, [data?.address, data?.allUsers])



 



  return (
      <>
        <ConnectButton />
        <main className="bg-black">
          <form className="form-tracker"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            if(data?.currentUser != undefined ) {
              addPackage.mutate({localtracker: data?.packageForm.localtracker, description: data?.packageForm.description , ownerId:  data?.currentUser?.id   })
            } else {
              console.log("need to log in")
            }}}>
              <CustomInputMain label="Local Tracking Number" placeholder='local tracking code' name="localtracker" setPackageForm={ data?.setPackageForm as React.Dispatch<React.SetStateAction<PackageForm>>} packageForm={data?.packageForm as PackageForm}   />
              <CustomInputMain label="Any Description" placeholder='description' name="description" setPackageForm={ data?.setPackageForm as React.Dispatch<React.SetStateAction<PackageForm>>} packageForm={data?.packageForm as PackageForm}   />
              <SubmitButtton label="Track PAckage" />
          </form>
          <div>{data?.address && data?.address}</div>
          <Link href='admin/manage'>to admin</Link>
        </main>
      </>
    
  );
};

export default Home;
