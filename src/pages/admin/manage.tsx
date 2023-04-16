import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";




const Manage : NextPage = () => {
    const {data: allUsers} = api?.users?.allUsers?.useQuery()
    const router = useRouter()

    return (
        <section className="bg-black">
        <table>
            <thead>
                <tr>
                    <th>User:</th>
                    <th>packages:</th>
                </tr>
            </thead>
            {allUsers?.map(user =>  <tbody key={user.id}>
                <tr onClick={() => router.push(`${user.id}`)}>
                    <td>{user.token.slice(0, 6)}</td>
                    <td> {user.package.length}</td>
                </tr> 
            </tbody> 
            )}
        </table>
        </section>
    )

}

export default Manage