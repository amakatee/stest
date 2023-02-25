import { type NextPage } from "next";
// import { useStateContext } from "../../context/StateContext";
import p from '../../data/packageStatus.json'
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
const Payment : NextPage = () => {
    const packages = p.filter(p => p.status === "PAYMENT")
    
   

    return (
        <Layout>
             {packages.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack.owner} status={pack.status} recipient={pack.recipient}  billing={pack.billing} type={pack.type} weight={pack.weight} />
             ): <div> no data</div>}
           <div className="payment">
                <p> Total: 30$</p>
                <p>Procceed payment</p>

            </div>
       </Layout>
      
    )

}

export default Payment