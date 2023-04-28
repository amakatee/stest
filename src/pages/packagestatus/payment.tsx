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
           <div className="payment flex py-4 items-center ">
                <p> Total: 30$</p>
                <button type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 ">
                    <svg className="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Pay with Ethereum
                 </button>

            </div>
          <ul className="flex flex-col align-center justify-between gap-3 min-h-[20vh]  max-h-[70vh] overflow-scroll pb-[10vh]" >
            {data?.currentUser?.packingorder.length && data?.currentUser?.packingorder?.map((box) => 
            <div key={box.id}
                  //  onClick={() => setPackageDetail({...packageDetail, id:box.id})}
                  >
                   <SinglePaymentPackage packid={packageDetail.id} box={box} packageDetail={packageDetail} setPackageDetail={setPackageDetail}  />
             </div>)}
            </ul>

            {packageDetail.show && <PackingPageDetail id={packageDetail.id}   packageDetail={packageDetail} setPackageDetail={setPackageDetail} />}
             
          
       </Layout>
      
    )

}

export default Payment