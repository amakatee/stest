import { createContext, ReactElement } from "react";
import { useContext } from "react";
import { useContract, useAddress, useMetamask,useContractWrite } from "@thirdweb-dev/react";


type ContextType = {
    address: string | undefined,
    contract: any,
    a: string | undefined,
    createCampaign: any,

}

interface CampaigneInfo {
    address: string, 
    title: string,
    description: string,
    target: any,
    data:   string | number | Date,
    image: string | undefined
 

}

type ChildType = {
    children?: ReactElement | undefined
}
const StateContext = createContext<any>({})


export const StateContextProvider = ({children} : ChildType ) : ReactElement => {
    const {contract } = useContract('0x2A88855B95C7c2a2a9b56365996c62000793fb67')

    const {mutateAsync: createCampaign  } = useContractWrite(contract, 'createCampaign') 
    const address : string | undefined = useAddress()
    const connect: any = useMetamask()
 

    // const publishCampaign = async (form : any ) =>{

    //     try {
    //         const data:any   = await createCampaign([
    //             address , //owner
    //             form.title,
    //             form.description,
    //             form.target,
    //             new Date(form.deadline).getTime(),
    //             form.image
    
    //         ])
    //         console.log("Created succesfully", data)

    //     } catch(err){
    //         console.log("Fail" , err)
    //     }
       
    // }

    return (
     <StateContext.Provider value={{
         address,
         contract,
         connect,
         
         
        //  createCampaign: publishCampaign

     }}>
         {children}
        
    </StateContext.Provider>
    )

}

 export const useStateContext = () => useContext(StateContext)
// export default StateContext