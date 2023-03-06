import { type NextPage } from "next";
import p from '../../data/packageStatus.json'
import SinglePackageItem from "../../components/elements/SinglePackage";
import Layout from "../../components/packagepage/Layout";
const Receipt : NextPage = () => {
    const packages = p.filter(p => p.status === "RECIEPT")
    console.log(packages)


    return (
        <Layout>
            {packages.length ? packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack?.localtracker} status={pack.status} recipient={pack.recipient}  billing={pack.billing} type={pack.type} weight={pack.weight} />
             
            ) : <div> no data</div>}
           
       </Layout>
      
    )

}

export default Receipt