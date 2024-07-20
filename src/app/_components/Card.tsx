import React from 'react'

function Card({children}:{children: ReactNode, }) {
  return (
    <div className='py-8 text-center px-[50px] border border-card-border rounded-[20px]'>{children}</div>
  )
}

export default Card