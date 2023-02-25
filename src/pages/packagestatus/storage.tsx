import { type NextPage } from "next";
// import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from "../../components/elements/SinglePackage";
import p from '../../data/packageStatus.json'

const Storage : NextPage = () => {
    const packages = p.filter(pack => pack.status==="STORAGE")


    return (
        <Layout>
            <div className="address">
                <div>  + Add shipping adress</div>
                <div className="sma">no address choose</div>
             
            </div>
           {packages.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack.localtracker} status={pack.status} recipient={pack.recipient}  billing={pack.billing} type={pack.type} weight={pack.weight} />
             
            ) : <div> no data</div>}
       </Layout>
      
    )

}

export default Storage