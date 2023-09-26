import {type ReactNode} from 'react'

interface Mainprops{
    children:ReactNode
}

export default function MainContent({children}:Mainprops){
    return(
        <div className='grow'>
            {children}
        </div>
    )
}