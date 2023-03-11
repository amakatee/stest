import { type NextPage } from "next";
// import p from '../../data/packageStatus.json'
// import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import SinglePackageItem from '../../components/elements/SinglePackage'
import { api } from "../../utils/api";
const Packages : NextPage = () => {
    const p = api?.packages?.allPackages.useQuery()
    const packages =  p?.data?.filter(pack => pack.status==="DOMESTIC")

  

    return (
        <Layout>
               {packages?.length ?  packages.map((pack, i) =>  
                <SinglePackageItem key={i} owner={pack.localtracker as string} status={pack.status}  />
             
            ) : <div>no data</div>}
           
     
       </Layout>
      
    )

}

export default Packages