import { type NextPage } from "next";
// import p from '../../data/packageStatus.json'
// import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import StateContext from "../../context/StateContext";
import { StateContextProvider } from "../../context/StateContext";
import SinglePackageItem from '../../components/elements/SinglePackage'
import { api } from "../../utils/api";
import { useContext, useEffect } from "react";
import { Package} from "@prisma/client";
import { useStateContext } from "../../context/StateContext";

const Packages : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    const packages =  p?.data?.filter(pack => pack.status==="DOMESTIC")
    
    const value = useStateContext()
    console.log(value?.address)
    // const {pack  } = useContext(StateContext)
    // console.log(pack )
  
    return (
        <Layout>
               {packages?.length ?  packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack.localtracker as string} status={pack.status}  />
             
            ) : <div>no data</div>}
           
     
       </Layout>
      
    )

}

export default Packages