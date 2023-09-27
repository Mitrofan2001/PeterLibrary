import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Children, useCallback, useEffect, useState } from 'react'

type NavLinkItem = {
label:string
path:string
}

type NavLinkList = {
label:string
children:NavLinkItem[]
}

type NavLink = NavLinkItem | NavLinkList

export const navLinks:NavLink[]=[
  {
    label:'Home',
    path:'/'
  },
  {
    label:'Frontend basic Demo',
    children:[
        {
          label:'TodoList',
          path:'/library/frontend/todolist'
        },
        {
          label:'Taiwan weather',
          path:'/library/frontend/taiwanWeather'
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

export default function NavberMobile(){
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
    const router = useRouter()


    

    useEffect(() => {
      router.events.on('routeChangeComplete', () => setIsMobileOpen(false))
      return () => router.events.off('routeChangeComplete', () => setIsMobileOpen(false))
    }, [setIsMobileOpen, router.events])
    return(
        <>
        <aside
          className={clsx(
            'z-10 relative flex basis-64 flex-col gap-4 bg-black p-4 text-white',
            'max-md:fixed max-md:h-full max-md:w-[50%] max-md:transition-transform',
            !isMobileOpen && 'max-md:-translate-x-full'
          )}
        >

                  {/* Mobile Open */}
        <button
          className={clsx(
            'absolute -right-10 top-4 z-10 bg-transparent text-black md:hidden',
            isMobileOpen&&'hidden')}
          onClick={() => setIsMobileOpen(true)}
        >
          三 
        </button>

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
  if('children' in item){
    return(
      <div className='mb-6'>
      <div className='text-[16px] font-bold mb-[2px]'>{'✦ '+item.label}</div>
      {
        item.children.map((sub:any, index:number) => (
          <div key={index} className='pl-4 text-[16px] mb-[2px]'>
            <Link href={sub.path}>{'➤  '+sub.label}</Link>
          </div>
        ))}
      </div>
    )
  }else{
    return(
        <div className='font-bold text-[18px] mb-2'>
          <Link href={item.path}>{item.label}</Link>
        </div>    
    )
  }
}

  