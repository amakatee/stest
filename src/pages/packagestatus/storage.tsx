import { type NextPage } from "next";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
import { api } from "../../utils/api";
import { useStateContext } from "../../context/StateContext";
import { useEffect, useState } from "react";
import { Package, PackageStatus } from "@prisma/client";
import {useRouter} from 'next/router'
import PackingPage from '../../components/PackingPage'
import AddAddress from '../../components/AddAddress'




interface CheckedItem { 
    id: string,
    checked: boolean | null
} 
const Storage : NextPage = () => {
    const d  = useRouter()
    console.log(d)
    const data = useStateContext()
    const [warningMes, setWarningMes] = useState("")
    const [packingPage, setPackingPage] = useState(false)
    const [addressPage, setAddressPage] = useState(false)
    const [currentAddressId, setCurrentAddressId] = useState("")
    const {data: choodsenAddress} = api.addresses.getAddressById.useQuery({
        id:currentAddressId
    })
   
   
    const initialData = data?.storagePackages
    console.log(data?.currentUser)

    // const {data: initialData} = api?.packages?.getByStatus.useQuery({
    //     status: "STORAGE",
        
    // })
    const ctx = api.useContext();

    const {mutate} = api?.packages?.updateChecked.useMutation({
        onSuccess: async (data) => {
            console.log(data)
   
          await ctx.packages.allPackages.invalidate()
          }
    })
    const {mutate: updateStatus} = api?.packages.updatePackage.useMutation({
        onSuccess: async () => {
           await  ctx.packages.allPackages.invalidate()
          }

    }) 

    const {mutate: updateMessage} = api?.packages?.updateUserMessage.useMutation({
        onSuccess: async () => {
          await  ctx.packages.allPackages.invalidate()
           
          }
    })

    const {mutate: createOrder} = api?.orders?.createPacking?.useMutation({
        onSuccess: async () => {
            
  
           await ctx.orders.getAllPackingOrders.invalidate()
       
          }
    })

    const {data: allOrders} = api?.orders?.getAllPackingOrders.useQuery()
    console.log(allOrders?.length ? allOrders : 0)
   

    
    
     const  [storageBoxes , setStorageBoxes] = useState<Package[] | undefined>(initialData )
  
    useEffect(() => {
        setStorageBoxes(initialData)

    },[initialData])

    


     const pickedPackages =  storageBoxes?.filter(box => box.checked === true)
        const packWeight = pickedPackages?.map(box => box.weight)
        const weightSum = packWeight?.reduce((total , item ) => (total as number)  + (item as number), 0 )
   
 

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement> , id: string)=> {
        setStorageBoxes(storageBoxes?.map(box => {
            if(box.id === id) {
                return {...box, checked: e.target.checked}
            } else { return box}
        }))
        mutate({
            id: id,
            checked: e.target.checked
        })
    } 
    
 
    const packChoosenPackages = () => {
        if(!currentAddressId) {
            setWarningMes("no address")
            console.log('no address choosen ')
            return
        }
        if(!pickedPackages?.length) {
            setWarningMes("no packages Choosen")
            return
        }
       
        setWarningMes("")
        setStorageBoxes(storageBoxes?.filter((box) =>  !pickedPackages?.includes(box)
        ))
        const ids = pickedPackages?.map(pack => pack.id)
 

        createOrder({
               ownerId: data?.currentUser?.id as string,
               packageids: ids,
               orderno: "new order",
               weightsum: weightSum as number,
               recipient: '',
               country: '',
               type: '',
               usermessage:'' ,
               billing: 0,
               addressid: currentAddressId
                   
             })
     
     pickedPackages?.map((picked, i ) => {
       
         updateStatus({
             id: picked.id,
             status: PackageStatus.PAYMENT
             })
         updateMessage({
             id: picked.id,
             usermessage: "Packing"

       })
     })

}

    return (
        <>
        {addressPage && <AddAddress setAddressPage={setAddressPage} currentUserId={data?.currentUser?.id as string} setCurrentAddressId={setCurrentAddressId}/>}
        {packingPage && <PackingPage setPackingPage={setPackingPage} pickedPackages={pickedPackages}  />}
       
        <Layout>
            <div className="n ">
            <div className=" min-h-[3rem]  bg-[white] flex">
            <div>{warningMes}</div>
                <p>picked</p>
                <input className="text-blue bg-[#1da1f2] " id="number" type="number" value={pickedPackages?.length} />
                <div>{weightSum} g</div>
                <button onClick={() => packChoosenPackages()} type="button">pack</button>
            </div>
            <div className="address" onClick={() => setAddressPage(prev => !prev)}>
                <div>  + Add shipping adress</div>
                <div className="sma">{choodsenAddress && 
                <div><p>{choodsenAddress.firstName}</p> 
                <p>{choodsenAddress.secondName}</p>
                <p>{choodsenAddress.country}</p>
                </div>
               }</div>
             
            </div>
            </div>
          
           <ul className="flex flex-col align-center justify-between gap-3 pt-[13vh] pb-[5vh]" >
           {storageBoxes?.length ? [...storageBoxes]?.map((pack, i) =>  
                <SinglePackageItem key={i}  packid= {pack?.id } setStorageBoxes={setStorageBoxes} storageBoxes={storageBoxes} localtracker={pack?.localtracker as string} status={pack.status} recipient={pack?.recipient as string}  billing={pack.billing as number } type={pack.type as string} weight={pack.weight as number} checked={pack?.checked as boolean} handleCheckbox={handleCheckbox} boxes={storageBoxes as Package[] | undefined} usermessage={pack?.usermessage as string}  />) 
                : <div> no data</div>}
            </ul>
             
     </Layout>

     </>
      
    )

}

export default Storage