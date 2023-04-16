import { type NextPage } from "next";
import { useStateContext } from "../../context/StateContext";
import SinglePackageItem from "../../components/elements/SinglePackage";
import Layout from "../../components/packagepage/Layout";
import { api } from "../../utils/api";
const Receipt : NextPage = () => {
  
    const data = useStateContext()
    return (
        <Layout>
            <div>no data</div>
            {/* {data?.receiptPackages?.length ? data?.receiptPackages?.map((pack, i) =>  
                <SinglePackageItem key={i} localtracker={pack?.localtracker as string} createdAt={pack.createdAt} status={pack.status} recipient={pack.recipient as string}  billing={pack.billing as number} type={pack.type as string}  weight={pack.weight as number} />
             
            ) : <div> no data</div>} */}
           
       </Layout>
      
    )

}

export default Receipt