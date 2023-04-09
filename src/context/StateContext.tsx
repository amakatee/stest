import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Package, PackageStatus, User, PackingOrder } from "@prisma/client";
import type {ConnectorData} from 'wagmi'
import { useDisconnect, useMetamask, useAddress } from "@thirdweb-dev/react";



interface PackageForm { 
    localtracker: string,
    description : string
  }
interface StateContextType  {
    connect: () => Promise<{
        data?: ConnectorData<any>| undefined;
        error?: Error | undefined;
    } | {
        error: Error;
    }>,
    address: string | undefined,

    packageForm: PackageForm ,
    setPackageForm :  React.Dispatch<React.SetStateAction<PackageForm>>,

    disconnect: () => Promise<void | {
        data?: ConnectorData<any> | undefined;
        error?: Error | undefined;
    }>,
    allUsers:  (User & {
        package: Package[];
    })[] | undefined,
    currentUser: (User & {
        package: Package[];
    } & {packingorder: PackingOrder[]}) | undefined,

    allPackages: any,
    domesticPackages: Package[] | undefined,
    storagePackages: Package[] | undefined,
    paymentPackages:  Package[] | undefined,
    receiptPackages: Package[] | undefined,
    storageBoxes: Package[]  | undefined,
    setStorageBoxes: React.Dispatch<React.SetStateAction<Package[] | undefined>>,
 

}


  

type Props = {
    children?: ReactNode | undefined;
};



const StateContext = createContext<null | StateContextType>(null)

export function StateContextProvider({children} : Props)  {
  
     const connect = useMetamask()
     const address = useAddress()
     const disconnect = useDisconnect()

     const allPackages = api?.packages?.allPackages.useQuery()

    

     const {data: allUsers, isLoading: LoadingUsers} = api?.users?.allUsers?.useQuery()
     const currentUser = allUsers?.find(user => user.token === address)

     const domesticPackages = currentUser?.package?.filter(pack => pack.status === "DOMESTIC")
     const storagePackages = currentUser?.package?.filter(pack => pack.status === "STORAGE")
     const paymentPackages = currentUser?.package?.filter(pack => pack.status === "PAYMENT")
     const receiptPackages = currentUser?.package?.filter(pack => pack.status === "RECEIPT")

     const  [ storageBoxes , setStorageBoxes] = useState<Package[] | undefined>(storagePackages )

   

     
    const [packageForm, setPackageForm] = useState<PackageForm>({
        localtracker: '',
        description: ''
    })

   
 

    const value = {
        connect,
        packageForm,
        setPackageForm,
        address,
        disconnect,
        allUsers,
        currentUser,
        allPackages,
        domesticPackages,
        storagePackages,
        paymentPackages,
        receiptPackages,
        storageBoxes,
        setStorageBoxes,
       
    
    }
  
    
 

    return (
    <StateContext.Provider value={value }>
        {children}
    </StateContext.Provider>
)}


export const useStateContext = () => useContext(StateContext)
export default StateContext







