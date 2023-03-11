import { type NextPage } from "next";
// import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
// import p from '../../data/packageStatus.json'
import { api } from "../../utils/api";
const Storage : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    const packages = p?.data?.filter(pack => pack.status==="STORAGE")


    return (
        <Layout>
            <div className="address">
                <div>  + Add shipping adress</div>
                <div className="sma">no address choose</div>
             
            </div>
           {packages?.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack?.localtracker as string} status={pack.status} recipient={pack?.recipient as string}  billing={pack.billing as string} type={pack.type as string} weight={pack.weight as string} />
             
            ) : <div> no data</div>}
       </Layout>
      
    )

}

export default Storage