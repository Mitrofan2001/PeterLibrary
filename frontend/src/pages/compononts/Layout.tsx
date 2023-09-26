import NavberMobile from "@/pages/compononts/navbarMobile"
import MainContent from "@/pages/compononts/MainContent"
import { ReactNode } from "react"

interface MainProps{
    children:ReactNode
}

export default function Layout ({children}:MainProps){

    return (
        <main className='flex h-screen w-screen font-inter bg-white'>
           <NavberMobile/>
            <MainContent>
                {children}
            </MainContent>
        </main>
    )
}