import { type NextPage } from "next";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
import { api } from "../../utils/api";
import { useStateContext } from "../../context/StateContext";
import { useEffect, useState } from "react";
import PreviousMap from "postcss/lib/previous-map";
import { check } from "prettier";
import { Package, PackageStatus } from "@prisma/client";



interface CheckedItem { 
    id: string,
    checked: boolean | null
} 
const Storage : NextPage = () => {
    const {mutate} = api?.packages?.updateChecked.useMutation()
    const {mutate: updateStatus} = api?.packages.updatePackage.useMutation() 
    const {mutate: updateMessage} = api?.packages?.updateUserMessage.useMutation()
  
    const data = useStateContext()

    const initialData = data?.storagePackages
    
    
    const  [ checkedBoxes , setIsChecked] = useState<Package[] | undefined>(initialData )
    
    useEffect(() => {
        setIsChecked(initialData)

    }, [ initialData])

    const pickedPackages =  checkedBoxes?.filter(box => box.checked === true)

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement> , id: string)=> {
    
        setIsChecked(checkedBoxes?.map(box => {
            if(box.id === id) {
                return {...box, checked: e.target.checked}
            } else { return box}
        }) )
        
       
        mutate({
            id: id,
            checked: e.target.checked
        })
    } 
    
    const handlePickedPackages = () => {
         console.log(pickedPackages?.map(p =>{
             if( p.checked === true) {
                 updateStatus({
                   id: p.id,
                   status: PackageStatus.PAYMENT
                })
                updateMessage({
                    id: p.id,
                    usermessage: "Payment Calculation"
                })
                 return {...p, status: PackageStatus.PAYMENT}
             } else {
                 return p
             }
         }))

    }
  console.log(pickedPackages)
    return (
        <Layout>
            <div className="address">
                <div>  + Add shipping adress</div>
                <div className="sma">no address choose</div>
             
            </div>
            <div>
           {data?.storagePackages?.length ? data?.storagePackages.map((pack, i) =>  
                <SinglePackageItem key={i} packid= {pack?.id as string}localtracker={pack?.localtracker as string} status={pack.status} recipient={pack?.recipient as string}  billing={pack.billing as string} type={pack.type as string} weight={pack.weight as string} checked={pack?.checked as boolean} handleCheckbox={handleCheckbox} checkedBox={checkedBoxes} usermessage={pack?.usermessage as string}  />) 
                : <div> no data</div>
                
                }
                 <button onClick={handlePickedPackages } type="submit">submit</button>
               
           </div>
       </Layout>
      
    )

}

export default Storage