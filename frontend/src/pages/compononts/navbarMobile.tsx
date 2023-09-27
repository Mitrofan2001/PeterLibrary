import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Children, useCallback, useEffect, useMemo, useState } from 'react'

type NavLinkItem = {
label:string
path:string
}

type NavLinkList = {
label:string
children:NavLinkItem[]
}

type NavLink = NavLinkItem | NavLinkList

export default function NavberMobile(){
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
    const router = useRouter()

    const navLinks:NavLink[]=[
      {
        label:'home',
        path:'/'
      },
      {
        label:'Frontend basic Demo',
        children:[
            {
              label:'todoList',
              path:'/library/frontend/todolist'
            }
          ]
      },
      {
        label:'Fronend plugin Demo',
        children:[
          {
            label:'i18 translation',
            path:'/'
          }
        ]
      },
      {
        label:'web3.js Demo',
        children:[
          {
            label:'getBlance',
            path:'/library/web3js/getBlance'
          }
        ]
      }
    ]
    

    useEffect(() => {
      router.events.on('routeChangeComplete', () => setIsMobileOpen(false))
      return () => router.events.off('routeChangeComplete', () => setIsMobileOpen(false))
    }, [setIsMobileOpen, router.events])
    return(
        <>
        {/* Mobile Open */}
        <button
          className={clsx(
            'absolute left-0 top-0 z-10 my-4 mx-8 bg-transparent text-black md:hidden',
            isMobileOpen&&'hidden')}
          onClick={() => setIsMobileOpen(true)}
        >
          三 
        </button>
  
        <aside
          className={clsx(
            'z-10 flex basis-64 flex-col gap-4 bg-black p-4 text-white',
            'max-md:fixed max-md:h-full max-md:w-[50%] max-md:transition-transform',
            !isMobileOpen && 'max-md:-translate-x-full'
          )}
        >
          {/* Mobile Close */}
          <button
            className={'absolute left-0 top-0 m-4 bg-transparent hover:bg-transparent md:hidden'}
            onClick={() => setIsMobileOpen(false)}
          >
            X
          </button>

            <nav className='mt-10 grid-cols gap-2 overflow-y-auto'>
              {navLinks.map((navLink, index) => (
                <NavLink key={index} item={navLink}/>
              ))}
            </nav>
        </aside>
      </>
    )
}

function NavLink ({item}:{item:NavLink}){
  const router = useRouter()

  if('children' in item){
    return(
      <>
      <div>{item.label}</div>
      {
        item.children.map((sub:any, index:number) => (
          <div key={index}>
            <Link href={sub.path}>{sub.label}</Link>
          </div>
        ))}
      </>
    )
  }else{
    return(
        <div>
          <Link href={item.path}>{item.label}</Link>
        </div>    
    )
  }
}

  