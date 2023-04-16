import { type NextPage } from "next";
import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
import { useState } from "react";
import PackingPageDetail from '../../components/PaymentPackageDetail'
import  SinglePaymentPackage from '../../components/elements/SinglePaymentPackage'
import type { PackingOrder} from '@prisma/client'


const Payment : NextPage = () => {
    const data = useStateContext()
    const currentUserPackages = data?.currentUser?.package.map(pack => pack)
  
    const [packageDetail, setPackageDetail] = useState({show:false, id: ""})


    // data?.currentUser?.packingorder?.map((pack) => console.log(pack))
    return (
        <Layout>
            {data?.currentUser?.packingorder.length && data?.currentUser?.packingorder?.map((box) => 
            <div key={box.id}
            onClick={() => setPackageDetail({...packageDetail, show: !packageDetail.show, id:box.id})}>
    
             <SinglePaymentPackage packid={packageDetail.id} box={box} />
             </div>)}


            {packageDetail.show && <PackingPageDetail id={packageDetail.id} />}
              {/* {data?.paymentPackages?.length ? data.paymentPackages?.map((pack, i) =>  
                <SinglePackageItem key={i} localtracker={pack?.localtracker as string} status={pack.status} recipient={pack.recipient as string}  billing={pack.billing as number} type={pack.type as string} weight={pack.weight as number} usermessage={pack.usermessage as string}  />
             ): <div> no data</div>} */}
           <div className="payment">
                <p> Total: 30$</p>
                <p>Procceed payment</p>

            </div>
       </Layout>
      
    )

}

export default Payment