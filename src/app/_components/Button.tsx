'use client'

import { ReactNode } from "react"

function Button({children, }:{children: ReactNode, }) {

 
  return (
    <button type='submit' className='bg-black text-white font-medium py-[18px] rounded-md mt-2 flex justify-center capitalize tracking-wider'>{children}</button>
  )
}

export default Button