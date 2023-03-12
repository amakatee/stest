import { type NextPage } from "next";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
import { api } from "../../utils/api";
import { useStateContext } from "../../context/StateContext";
const Storage : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    const packages = p?.data?.filter(pack => pack.status==="STORAGE")

    const data = useStateContext()
    console.log(data)


    return (
        <Layout>
            <div className="address">
                <div>  + Add shipping adress</div>
                <div className="sma">no address choose</div>
             
            </div>
           {data?.storagePackages?.length ? data?.storagePackages.map((pack, i) =>  
                <SinglePackageItem key={i} localtracker={pack?.localtracker as string} status={pack.status} recipient={pack?.recipient as string}  billing={pack.billing as string} type={pack.type as string} weight={pack.weight as string} />
             
            ) : <div> no data</div>}
       </Layout>
      
    )

}

export default Storage