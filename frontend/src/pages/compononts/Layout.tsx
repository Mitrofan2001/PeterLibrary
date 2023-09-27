import NavberMobile from "@/pages/compononts/navbarMobile"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import {navLinks} from "@/pages/compononts/navbarMobile"

interface MainProps{
    children:ReactNode
}

export default function Layout ({children}:MainProps){
    const router = useRouter()
    const [pageLocal,setPageLocal] = useState<string|null>(null)
    useEffect(()=>{
        navLinks.map((item,index)=>{
            ('children' in item)?(
            item.children.map((item,index)=>(
                item.path === router.route?setPageLocal(item.label):null
            ))
        ):null})
    },[router.route])

    return (
        <main className='flex w-screen'>
           <NavberMobile/>
            <div className="grow">
                <div className="fixed w-full bg-white h-[56px] flex items-center justify-center text-black shadow-xl">{"Peter's Library："+pageLocal}</div>
                {children}
            </div>
        </main>
    )
}