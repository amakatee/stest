import { type NextPage } from "next";
import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/packagepage/Layout";
const Storage : NextPage = () => {
    const {a, createCampaign, connect, address} = useStateContext()


    return (
        <Layout>
            <ul className="boxes">
                storage
            <li className="box">
            </li>
        </ul>
       </Layout>
      
    )

}

export default Storage