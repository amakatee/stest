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
                <button type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
                    <svg className="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Pay with Ethereum
                 </button>

            </div>
       </Layout>
      
    )

}

export default Payment