import { type NextPage } from "next";
// import p from '../../data/packageStatus.json'
import SinglePackageItem from "../../components/elements/SinglePackage";
import Layout from "../../components/packagepage/Layout";
import { api } from "../../utils/api";
const Receipt : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    console.log(p.data)
    const packages = p?.data?.filter(p => p.status === "RECEIPT")



    return (
        <Layout>
            {packages?.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack?.localtracker as string} status={pack.status} recipient={pack.recipient as string}  billing={pack.billing as string} type={pack.type as string}  weight={pack.weight as string} />
             
            ) : <div> no data</div>}
           
       </Layout>
      
    )

}

export default Receipt