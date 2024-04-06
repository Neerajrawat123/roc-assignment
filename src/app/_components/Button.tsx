import React from 'react'

function Button({children}) {
  return (
    <button className='bg-black text-white font-medium py-[18px] rounded-md mt-2 flex justify-center capitalize tracking-wider'>{children}</button>
  )
}

export default Button