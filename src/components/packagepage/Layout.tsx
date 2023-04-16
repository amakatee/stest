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
        <section className="ent-page w-[100vw] min-h-[100vh]">
          <UpperNav />
         <main className="flex flex-col align-center pt-[5rem] pr-[1rem] pl-[1rem] gap-5 ">
              <ul className="main-menu flex w-[100%] align-center justify-around">
                {navdata.map((data, i) => <PackageNavItem key={i} title={data.title} link={data.link} active={  router.asPath === data.link  ? data.active : !data.active} /> )}
              </ul>
            <div className="w-[100%] min-h-[10vh] max-h-[60vh] overflow-y-scroll ">
            {children}
             </div>
        </main>
      
        </section>

        </>
  )
}