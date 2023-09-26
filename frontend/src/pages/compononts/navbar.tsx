import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navber(){
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(true)
    const router = useRouter()
    return(
        <>
        {/* Mobile Open */}
        <button
          className={'absolute left-0 top-0 z-10 my-4 mx-8 bg-transparent text-black hover:bg-transparent md:hidden'}
          onClick={() => setIsMobileOpen(true)}
        >
          三
        </button>
  
        <aside
          className={clsx(
            'z-10 flex basis-64 flex-col gap-4 bg-black p-4 text-white',
            'max-md:fixed max-md:h-full max-md:w-full max-md:transition-transform',
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
  
            <nav className='mt-10'>a</nav>
        </aside>
      </>
    )
}

  