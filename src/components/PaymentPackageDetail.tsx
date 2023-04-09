import React, { ReactElement } from 'react'
import { useStateContext } from '../context/StateContext'
import ConnectButton from './elements/ConnectButton'
import { api } from "../utils/api"


interface Props {
    id: string
  }
  
const PackingPageDetail = ({id} : Props) : ReactElement => {
    const data = useStateContext()
    console.log(data?.currentUser?.package)

    const {data: packages } = api.orders.getPackageById.useQuery({
         id
        }) 
   
    console.log(packages)
 //   storageBoxes?.filter((box) =>  !pickedPackages?.includes(box)
    const existingPacks = data?.currentUser?.package?.filter(pack => packages?.packageids?.includes(pack.id))
    console.log(existingPacks)
    

    return (
        // <div>hello {packages?.packageids} {JSON.stringify(packages?.createdAt)}
        <div>{existingPacks?.map(pack => <div> {pack.localtracker}</div>)}</div>
       
        )
   }    

export default PackingPageDetail