import { Inter } from 'next/font/google'
import Navber from './compononts/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex h-screen w-screen font-inter bg-white`}
    >

      <Navber/>

    </main>
  )
}
