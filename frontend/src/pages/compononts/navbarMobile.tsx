import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function NavberMobile(){
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
    const router = useRouter()

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
  
            <nav className='mt-10 flex flex-col gap-2 pl-2'>
              <Link className='relative before:absolute before:content-["I"] before:text-white before:-left-2 before:top-0' href={'/'}>Home</Link>
              <Link href={'/library/web3js/getBlance'}>II.getBalance</Link>
              <Link href={'/library/frontend/todolist'}>III.todoList</Link>
            </nav>
        </aside>
      </>
    )
}

  