import { type NextPage } from "next";
// import { useStateContext } from "../../context/StateContext";
// import p from '../../data/packageStatus.json'
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
import { api } from "../../utils/api";

const Payment : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    const packages = p?.data?.filter(p => p.status === "PAYMENT")
    
   

    return (
        <Layout>
             {packages?.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack?.localtracker as string} status={pack.status} recipient={pack.recipient as string}  billing={pack.billing as string} type={pack.type as string} weight={pack.weight as string} />
             ): <div> no data</div>}
           <div className="payment">
                <p> Total: 30$</p>
                <p>Procceed payment</p>

            </div>
       </Layout>
      
    )

}

export default Payment