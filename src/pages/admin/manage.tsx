import { type NextPage } from "next";
import { usersRouter } from "../../server/api/routers/users";
import { api } from "../../utils/api";
import Link from "next/link";



const Manage : NextPage = () => {
    const {data: allUsers} = api?.users?.allUsers?.useQuery()

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>User:</th>
                    <th>packages</th>
                </tr>
            </thead>
            {allUsers?.map(user =>  <tbody key={user.id}>
               <Link href={`${user.id}`}> 
                <tr>
                    <td>{user.token.slice(-8)}</td>
                    <td> {user.package.length}</td>
                </tr> 
                </Link>
            </tbody> 
            )}
        </table>
        </>
    )

}

export default Manage