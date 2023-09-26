import NavberMobile from "@/pages/compononts/navbarMobile"
import { ReactNode } from "react"

interface MainProps{
    children:ReactNode
}

export default function Layout ({children}:MainProps){

    return (
        <main className='flex h-screen w-screen'>
           <NavberMobile/>
            <div className="grow">
                <div className="bg-white h-[56px] flex items-center justify-center text-black">Peter's Library</div>
                {children}
            </div>
        </main>
    )
}