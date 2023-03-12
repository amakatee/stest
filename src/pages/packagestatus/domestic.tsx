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
    
    const data = useStateContext()
    return (
        <Layout>
               {data?.domesticPackages?.length ?  data?.domesticPackages?.map((pack, i) =>  
                <SinglePackageItem key={i} userToken={data?.currentUser?.token as string} localtracker={pack.localtracker as string} description={pack?.description as string} status={pack.status}  />
              ) : <div>no Packages found</div>}
        </Layout>
      
    )

}

export default Packages