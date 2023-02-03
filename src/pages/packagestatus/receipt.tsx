import { type NextPage } from "next";
import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
const Receipt : NextPage = () => {
    const {a, createCampaign, connect, address} = useStateContext()


    return (
        <Layout>
            <ul className="boxes">
                reciept
            <li className="box">
            </li>
        </ul>
       </Layout>
      
    )

}

export default Receipt