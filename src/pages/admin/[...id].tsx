import { type NextPage } from "next";

import { api } from "../../utils/api";

import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import React from "react";
import { Package } from "@prisma/client";
import {PackageStatus} from "@prisma/client";
import PreviousMap from "postcss/lib/previous-map";
import { string } from "zod";




// enum Status {AWAITS = 'AWAITS', DOMESTIC = "DOMESTIC", STORAGE = "STORAGE", RECEIPT="RECIEPT"}
// type PackagesStatus = "AWAITS" | "DOMESTIC" | "STORAGE" | "RECEIPT"




const User : NextPage = () => {
    const {data: allUsers} = api?.users?.allUsers?.useQuery()
    const {mutate: addPackage} = api?.packages?.updatePackage.useMutation({
        onSuccess: (t: any) => {
            console.log(t)
            
        }
    })


    const {mutate: updateStorage} = api?.packages?.updateStorageData.useMutation({
        onSuccess: (t: any) => {
           const existingPackage = packages?.find(p => p.id === t.id)
           
            
        }
    }
        
    )

    const {mutate: updateBilling} = api?.packages?.updatePaymentData.useMutation({

    })

  const {query} = useRouter()
    const currentId = query.id && query.id[0]
    const currentUser = allUsers?.find(user => user.id === currentId)

    const [packages , setPackages] = useState<Package[] | undefined>([])



    useEffect(() => {
        setPackages(currentUser?.package.map(p => p))

    }, [allUsers])

    
  
    
    let status : string

   
    
    
  
    const changeStatus = (id: string, newStatus: PackageStatus) => {
        addPackage({
            id: id,
            status: newStatus
       })}

 
    const PackagesStatus = ["AWAITS", "DOMESTIC", "STORAGE", "PAYMENT", "RECEIPT"] as const 
    type PackageStatus = typeof PackagesStatus[number]
    type PackageSingle = {
        status: PackageStatus
    }

   

    const updateStorageData = (id: string , data: string) => {
        const updatedArray = packages?.map(pack => {
            if(pack.id === id) {
                return {...pack, weight: data}
                // pack.weight = data
            }
            return pack
           
        })
        setPackages(updatedArray)
        updateStorage({
            id, weight: data
        })

    }

    const updateBillingData = (id: string, data: string) => {
        const updatedArray = packages?.map(pack => {
            if(pack.id === id) {
                return {...pack, billing: data}
               
            }
            return pack
        })
        setPackages(updatedArray)
        updateBilling({
            id, recipient: "k", billing:data, type: "ds"
        })

    } 

    function currentPage (id: string, newStatus: PackageStatus) {
        const existingPackage  = packages?.find(pack => pack.id === id )
        console.log(existingPackage?.localtracker)

        
        switch(status = newStatus) {
            case 'STORAGE':
                console.log('pay', newStatus, status)
                return  <section>
                <label> Weight: 
                   <input 
                   placeholder="weight"
                   value={existingPackage?.weight || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateStorageData(id, event.target.value)}
                   /> 
                   
                </label>
                
             
                {/* <div>User : {currentUser.id.slice(-3)}</div> */}
                
            </section>
            break
            case 'PAYMENT':
                console.log('g')
                return  <section>
                <label> Weight: 
                   <input 
                   placeholder="weight"
                   value={existingPackage?.weight || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateStorageData(id, event.target.value)}
                   /> 
                   
                </label>
                <label> PAYMENT: 
                   <input 
                   placeholder="payment"
                   value={existingPackage?.billing || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateBillingData(id, event.target.value)}
                   /> 
                   
                </label>
                
             
                {/* <div>User : {currentUser.id.slice(-3)}</div> */}
                
            </section>
                break
             }
                

        }

    
    return (
        <main className="user-main"> 
        
        <div className="user-token ">  {currentUser?.token.slice(-9)} </div>
        <form>
       {packages?.map((pack) => <div key={pack.id} className="user-page">
            <div>{pack.localtracker}</div>
            <div>{pack.description}</div>
            {currentPage(pack.id, pack.status)}
  
            {/* {pack.status === "STORAGE"  && <section>
                <label> Weight: 
                   <input 
                   placeholder="weight"
                   value={pack?.weight || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateStorageData(pack.id, event.target.value)}
                   /> 
                   
                </label>
                
             
               
                
            </section> } */}
          
            {/* {pack.status === "PAYMENT" && <section>
            <label> Weight: 
                   <input 
                   placeholder="weight"
                   value={pack?.weight || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateStorageData(pack.id, event.target.value)}
                   /> 
                   
                </label>
                <label> Billing: 
                   <input 
                   placeholder="billing"
                   value={pack?.billing || ""}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateBillingData(pack.id, event.target.value)}
                   /> 
                   
                </label>
                
                <div>Country : {pack.country}</div>
                <div>Type : {pack.type}</div>

                
            </section> } */}
      

            <select
             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeStatus(pack.id, event.target.value as PackageStatus)} >
             <option value={pack.status}>{pack.status}</option>
             {PackagesStatus.map((status, i) =>  <option key={i} value={status}>{status}</option>)}
             
            
            </select>

        


         
          
        </div>)}
        <div>empty</div>

    
    

      
      

        </form>
        
        </main>
    )

}

export default User