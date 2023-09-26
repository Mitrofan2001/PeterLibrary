import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function NavberPC(){
    const [isPCOpen, setIsPCOpen] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeComplete', () => setIsPCOpen(false))
        return () => router.events.off('routeChangeComplete', () => setIsPCOpen(false))
      }, [setIsPCOpen, router.events])
    return(
        <>
        {/* PC Open */}
        <button
          className={'absolute right-0 top-0 z-10 my-4 mx-8 bg-transparent text-black hover:bg-transparent md:hidden'}
          onClick={() => setIsPCOpen(true)}
        >
          三
        </button>
  
        <aside
          className={clsx(
            'z-10 flex basis-64 flex-col gap-4 bg-black p-4 text-white',
            'max-md:fixed max-md:h-full max-md:w-full max-md:transition-transform',
            !isPCOpen && 'max-md:-translate-y-full'
          )}
        >
          {/* PC Close */}
          <button
            className={'absolute right-0 top-0 m-4 bg-transparent hover:bg-transparent md:hidden'}
            onClick={() => setIsPCOpen(false)}
          >
            X
          </button>
  
            <nav className='mt-10'>a</nav>
        </aside>
      </>
    )
}
