import { type NextPage } from "next";

import { api } from "../../utils/api";

import { useRouter } from 'next/router'
import { useState } from "react";
import React from "react";
import {PackageStatus} from "@prisma/client";



// enum Status {AWAITS = 'AWAITS', DOMESTIC = "DOMESTIC", STORAGE = "STORAGE", RECEIPT="RECIEPT"}
// type PackagesStatus = "AWAITS" | "DOMESTIC" | "STORAGE" | "RECEIPT"


const User : NextPage = () => {
    const {data: allUsers} = api?.users?.allUsers?.useQuery()

    const {mutate: addPackage} = api?.packages?.updatePackage.useMutation()
   
    const {query} = useRouter()

    
    const currentId = query.id && query.id[0]

   const currentUser = allUsers?.find(user => user.id === currentId)
  

    
   

    const changeStatus = (id: string, newStatus : PackageStatus) => {
        
        addPackage({
            id: id,
            status: newStatus
    })
}
    const PackagesStatus = ["AWAITS", "DOMESTIC", "STORAGE", "RECEIPT"] as const 
    type PackageStatus = typeof PackagesStatus[number]
    type Package = {
        status: PackageStatus
    }

    
   

    return (
        <main className="user-main"> 
        
        <div className="user-token ">  {currentUser?.token.slice(-9)} </div>
        <form>
        {currentUser?.package.map((pack) => <div key={pack.id} className="user-page">
            <div>{pack.localtracker}</div>
      

            <select
             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeStatus(pack.id, event.target.value as PackageStatus)} >
             <option value={pack.status}>{pack.status}</option>
             {PackagesStatus.map((status, i) =>  <option key={i} value={status}>{status}</option>)}
             
            
            </select>


         
          
        </div>)}
      

        </form>
        
        </main>
    )

}

export default User