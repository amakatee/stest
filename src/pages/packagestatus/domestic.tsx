import { type NextPage } from "next";
// import p from '../../data/packageStatus.json'
// import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from '../../components/elements/SinglePackage'
import { Package} from "@prisma/client";
import { useStateContext } from "../../context/StateContext";
import { useState, useEffect } from "react";
const Packages : NextPage = () => {
    
    const data = useStateContext()
    const [domestic, setDomestic ] = useState<Package[] | undefined>(data?.domesticPackages)

    useEffect(() => {
        setDomestic(data?.domesticPackages)
    },[data?.domesticPackages])
    return (
        <Layout>
               {domestic?.length ?  [...domestic]?.map((pack, i) =>  
                <SinglePackageItem storageBoxes={domestic} createdAt={pack.createdAt} setStorageBoxes={setDomestic} key={i} userToken={data?.currentUser?.token as string} packid={pack.id} localtracker={pack.localtracker as string} description={pack?.description as string} status={pack.status}  />
              ) : <div>no Packages found</div>}
        </Layout>
      
    )

}

export default Packages