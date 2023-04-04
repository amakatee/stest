import { type NextPage } from "next";

import { api } from "../../utils/api";

import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import React from "react";
import { Package, PackageStatus } from "@prisma/client";
import CustomInput from "../../components/elements/CustomInput";
import NumberInput from '../../components/elements/NumberInput'



// enum Status {AWAITS = 'AWAITS', DOMESTIC = "DOMESTIC", STORAGE = "STORAGE", RECEIPT="RECIEPT"}
// type PackagesStatus = "AWAITS" | "DOMESTIC" | "STORAGE" | "RECEIPT"




const User : NextPage = () => {
    const {data: allUsers} = api?.users?.allUsers?.useQuery()
    const {mutate: addPackage} = api?.packages?.updatePackage.useMutation({
        onSuccess: (t: any) => {
            console.log(t)
        }
    })



    const {mutate: updatePackageData} = api?.packages?.updateData?.useMutation({
        onError: (err) => {
            console.log(err)

        }
    })

  const {query} = useRouter()
    const currentId = query.id && query.id[0]
    const currentUser = allUsers?.find(user => user.id === currentId)

    const [packages , setPackages] = useState<Package[] | undefined>([])

    useEffect(() => {
        setFormData(currentUser?.package.map(p => p))

    }, [allUsers])
    const [formData, setFormData] = useState<Package[] | undefined> ([])
    console.log(formData)


    
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

  
    
     const getPackageData = (e:  React.FormEvent<HTMLFormElement>, id : string) => {
         e.preventDefault()
         const existingPackage = formData?.find(pack => pack.id === id)
        if(existingPackage){
            updatePackageData({
                id:existingPackage.id,
                weight: existingPackage.weight as number || 0 ,
                billing: existingPackage.billing as number || 0 ,
                recipient: existingPackage.recipient as string || "",
                country: existingPackage.country as string || "",
                type: existingPackage.type as string || "",
                tracking: existingPackage.tracking as string || "",
                checked: existingPackage.checked as boolean || false,
                usermessage: existingPackage.usermessage as string || ""

            })
            

        } else {
            console.log('Not successful')
        }
        


     }
    return (
        <main className="user-main"> 
        
        <div className="user-token ">  {currentUser?.token.slice(0, 6)} </div>
        <div className="forms">

            {formData?.map(pack => <form className="form" key={pack.id} onSubmit={(e:  React.FormEvent<HTMLFormElement>) => getPackageData(e, pack.id)}>
                <p><span>local tracker: </span>{pack.localtracker}</p>
                <p><span>description: </span>{pack.description}</p>
               
                <NumberInput label="weight" name="weight" id={pack.id} placeholderValue="weight"   property={pack.weight} setFormData={setFormData} formData={formData}  /> 
                <NumberInput label="billing" name="billing" id={pack.id} placeholderValue="billing"   property={pack.billing} setFormData={setFormData} formData={formData}  /> 
                <CustomInput label="country" name="country" id={pack.id} placeholderValue="country"   property={pack.country} setFormData={setFormData} formData={formData}  /> 
                <CustomInput label="recipient" name="recipient" id={pack.id} placeholderValue="recipient"   property={pack.recipient} setFormData={setFormData} formData={formData}  /> 
                <CustomInput label="type" name="type" id={pack.id} placeholderValue="type"   property={pack.type} setFormData={setFormData} formData={formData}  /> 
                <CustomInput label="tracking" name="tracking" id={pack.id} placeholderValue="tracking"   property={pack.tracking} setFormData={setFormData} formData={formData}  /> 
                <CustomInput label="user Message" name="usermessage" id={pack.id} placeholderValue="usr message"   property={pack.usermessage} setFormData={setFormData} formData={formData}  /> 



                <select
                   onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeStatus(pack.id, event.target.value as PackageStatus)} >
                   <option value={pack.status}>{pack.status}</option>
                    {PackagesStatus.map((status, i) =>  <option key={i} value={status}>{status}</option>)}
                </select>

                <button type="submit">Save Changes</button>
            </form>)
            }


       {packages?.map((pack) => <div key={pack.id} className="user-page">
            <div>{pack.localtracker}</div>
            <div>{pack.description}</div>
            {/* {currentPage(pack.id, pack.status)} */}
  
         
        
           
                

            <select
             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeStatus(pack.id, event.target.value as PackageStatus)} >
             <option value={pack.status}>{pack.status}</option>
             {PackagesStatus.map((status, i) =>  <option key={i} value={status}>{status}</option>)}
             
            
            </select>

        


         
          
        </div>)}
        <div>empty</div>

    
    

      
      

        </div>
        
        </main>
    )

}

export default User