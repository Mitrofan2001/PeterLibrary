import { useState } from "react"
import Web3 from "web3"

const HDWalletProvider = require('@truffle/hdwallet-provider');

declare global {
  interface Window {
    ethereum: any
  }
}

export default function Home() {
  const [inputAddress,setInputAdderss] = useState<string>('')
  const [walletBlance,setWalletBlance] = useState<string | null>(null) 

  const onClick= async ()=>{
      const web3 = new Web3(window.ethereum);
          web3.eth.getBalance(inputAddress).then((weiBalance: any) => {
            const ethBalance =  parseFloat(web3.utils.fromWei(weiBalance, 'ether')).toFixed(10);
            setWalletBlance(ethBalance);
      })}

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-[#E7AA4F]`}
    >
      <div>
        <input type="text" 
          className="text-black w-[500px] rounded-md p-2"
          value={inputAddress}
          onChange={(e)=>setInputAdderss(e.target.value)}
        />
        <div className='p-2 rounded-full border-2 border-white text-center mt-8 w-[250px] mx-auto' onClick={()=>onClick()}>getBlance!</div>
        <div className="text-center mt-5">{walletBlance?walletBlance+" eth":"plz input address that u want to search "}</div>
        <div className="text-center mt-5">{walletBlance&& "Hello World!"}</div>
      </div>
    </main>
  )
}
