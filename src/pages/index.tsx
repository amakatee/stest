import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useStateContext } from "../context/StateContext";
import { api } from "../utils/api";
import {useContext} from 'react'



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

interface Token {
  token: string | undefined
}
const Home: NextPage = () => {
  const {connect, address} = useStateContext()

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

  



 
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault()
  // await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18) })

  // }
   
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={async () => {
        if(address ){
          console.log('as')
         
        } else{
          await connect()
        }
      }}>{address ?  'Disonnect' : 'Connect'}</button>
      <main>
        <form onSubmit={(event : React.FormEvent) => {
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

        </form>

        {users?.map(u => <div key={u.name}>{u.token}</div>)}

        {/* <form onSubmit={event => handleSubmit(event)}>
          <input 
          placeholder="name coo"
          onChange={e => setForm({...form, title: e.target.value})}
          />
          <button>Submit </button>
        </form> */}

        <div>{address && address}</div>
        
      </main>
    </>
  );
};

export default Home;
