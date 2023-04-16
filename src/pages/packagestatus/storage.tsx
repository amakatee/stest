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
        {warningMes && <div onClick={() => setWarningMes("")} className=" border-b-[.5px] py-1 dark-bg-trans fixed flex w-full justify-between px-5 py-4">
           <p>{warningMes}</p>
           <p>close</p>
            </div>}

       
        <Layout>
            <div className="n font-light fixed">
            <div className=" min-h-[1rem] flex justify-around items-center py-3 border-b-[.6px] border-[#00FFFFF]">
        
                <p className="glowy">Picked: </p>
                <input className=" glowy bg-transparent w-[2rem] h-[2rem] text-center text-sm" id="number" type="number" value={pickedPackages?.length} />
                <p className="glowy">{weightSum} g</p>
                <button className=" text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-4 py-1.5 text-center text-[#18383c] uppercase" onClick={() => packChoosenPackages()} type="button">pack</button>
            </div>
            <div className="flex w-[100%] text-[1rem] justify-between items-center px-4 py-2" onClick={() => setAddressPage(prev => !prev)}>
                <p className="text-sm">  + Add shipping adress</p>

                <div className="text-xs ">{choodsenAddress && 
                <div className="flex gap-1 items center">
                <p>{choodsenAddress.firstName}</p> 
                <p>{choodsenAddress.secondName}</p>
                <p>{choodsenAddress.country}</p>
                </div>
               }</div>
             
            </div>
            </div>
          
           <ul className="flex flex-col align-center justify-between gap-3 pt-[17vh] pb-[5vh]" >
           {storageBoxes?.length ? [...storageBoxes]?.map((pack, i) =>  
                <SinglePackageItem key={i}  packid= {pack?.id } setStorageBoxes={setStorageBoxes} storageBoxes={storageBoxes} localtracker={pack?.localtracker as string} status={pack.status} recipient={pack?.recipient as string}  billing={pack.billing as number } type={pack.type as string} weight={pack.weight as number} checked={pack?.checked as boolean} handleCheckbox={handleCheckbox} boxes={storageBoxes as Package[] | undefined} usermessage={pack?.usermessage as string}  />) 
                : <div> no data</div>}
            </ul>
             
     </Layout>

     </>
      
    )

}

export default Storage