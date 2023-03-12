import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { api } from "../utils/api";
import { Package, PackageStatus } from "@prisma/client";
import { useDisconnect, useMetamask, useAddress } from "@thirdweb-dev/react";


interface StateContextType  {
    connect: () => Promise<{
        data?: any| undefined;
        error?: Error | undefined;
    } | {
        error: Error;
    }>,
    address: string | undefined
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>

    // disconnect: () => Promise<void | {
    //     data?: ConnectorData<any> | undefined;
    //     error?: Error | undefined;
    // }>


}


type Props = {
    children?: ReactNode | undefined;
};



const StateContext = createContext<null | StateContextType>(null)

export function StateContextProvider({children} : Props)  {
    const [user, setUser] = useState('userq2')
     const connect = useMetamask()
     const address = useAddress()
    // const disconnet = useDisconnect()
    const value = {
        connect,
        user,
        setUser,
        address
    }
  
    
 

    return (
    <StateContext.Provider value={value }>
        {children}
    </StateContext.Provider>
)}


export const useStateContext = () => useContext(StateContext)
export default StateContext






//  import { useContext } from "react";
// import { useContract, useAddress, useMetamask,useContractWrite, useDisconnect } from "@thirdweb-dev/react";


// // type ContextType = {
// //     adress: string | undefined
// //     contract: any,
// //     a: string | undefined,
// //     createCampaign: any,

// // }

// // interface CampaigneInfo {
// //     address: string, 
// //     title: string,
// //     description: string,
// //     target: any,
// //     data:   string | number | Date,
// //     image: string | undefined
 

// // }

// type ChildType = {
//     children?: ReactElement | undefined
// }
// const StateContext = createContext<any>({})


// export const StateContextProvider = ({children} : ChildType ) : ReactElement => {
//     const {contract } = useContract('0x2A88855B95C7c2a2a9b56365996c62000793fb67')
//     const disconnet = useDisconnect()
//     const {mutateAsync: createCampaign  } = useContractWrite(contract, 'createCampaign') 
//     const address = useAddress()
//     const connect = useMetamask()
 

//     // const publishCampaign = async (form : any ) =>{

//     //     try {
//     //         const data:any   = await createCampaign([
//     //             address , //owner
//     //             form.title,
//     //             form.description,
//     //             form.target,
//     //             new Date(form.deadline).getTime(),
//     //             form.image
    
//     //         ])
//     //         console.log("Created succesfully", data)

//     //     } catch(err){
//     //         console.log("Fail" , err)
//     //     }
       
//     // }

//     return (
//      <StateContext.Provider value={{
//          address,
//          contract,
//          connect,
//          disconnet
         
         
//         //  createCampaign: publishCampaign

//      }}>
//          {children}
        
//     </StateContext.Provider>
//     )

// }

//  export const useStateContext = () => useContext(StateContext)
// // export default StateContext


// createContext<Partial<Package[] | undefined>>([{ id: '',
//     createdAt: new Date(),
//     ownerId: '',
//     status: PackageStatus.AWAITS,
//     recipient: '',
//     country: '',
//     type:'',
//     weight: '',
//     billing:'',
//     tracking: '',
//     description:'',
//     localtracker:'',
//     statusval: '',
// }])

