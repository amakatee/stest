import { type NextPage } from "next";
import { api } from "../../utils/api";

const Manage : NextPage = () => {

    const {data: allPackages} = api?.packages?.allPackages?.useQuery()
    const {data: allUsers} = api?.users?.allUsers?.useQuery()



    console.log(allPackages)
    console.log(allUsers)

  

    return (
        <div>manage</div>
       
      
    )

}

export default Manage