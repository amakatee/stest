import { useRouter } from 'next/router'
import navdata from '../../data/statusNav.json'
import PackageNavItem from '../elements/PackageNavItem'
import ConnectButton from '../elements/ConnectButton'
import UpperNav from '../UpperNav'

interface Props {
    children: React.ReactNode;
  }
  
export default function Layout({ children } : Props) {
    const router = useRouter()

  

  return (
    <>
        <div className="ent-page">
          <UpperNav />
       
  
        <main className="package-page">
            <ul className="main-menu">
                
                {navdata.map((data, i) => <PackageNavItem key={i} title={data.title} link={data.link} active={  router.asPath === data.link  ? data.active : !data.active} /> )}
               
            </ul>
            <div className="main-window">
              <ul className='boxes'>
               {children}
            </ul>
               

            </div>
        </main>
      
        </div>

        </>
  )
}