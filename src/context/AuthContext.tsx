import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { api } from "../utils/api";
import type { Package, PackingOrder, Address, User } from "@prisma/client";
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
    } & {packingorder: PackingOrder[]})[] | undefined,
    currentUser: (User & {
        package: Package[];
    } &{ packingorder :PackingOrder[]}) | undefined


}


  

type Props = {
    children?: ReactNode | undefined;
};



const StateContext = createContext<null | StateContextType>(null)

export function StateContextProvider({children} : Props)  {
  
     const connect = useMetamask()
     const address = useAddress()
     const disconnect = useDisconnect()

     const {data: allUsers, isLoading: LoadingUsers} = api?.users?.allUsers?.useQuery()
     const currentUser = allUsers?.find(user => user.token === address)

     

     
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
        currentUser
    }
  
    
 

    return (
    <StateContext.Provider value={value }>
        {children}
    </StateContext.Provider>
)}


export const useStateContext = () => useContext(StateContext)
export default StateContext


