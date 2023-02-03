import { type NextPage } from "next";
import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
const Packages : NextPage = () => {
    const {a, createCampaign, connect, address} = useStateContext()


    return (
        <Layout>
            <ul className="boxes">
                jhkh
            <li className="box">
            </li>
        </ul>
       </Layout>
      
    )

}

export default Packages