import React from 'react'

function Banner() {
  return (
    <div className='bg-banner-col flex justify-center items-center' >
        <div className='flex py-3'>
            <img src="/images/Vector.svg" alt="" />
            <div className='px-5 font-medium text-sm leading-4'>
                <p>Get 10% off on business sign up</p>
            </div>
            <img src="/images/Vector.svg" className='rotate-180' alt="" />

        </div>
    </div>
  )
}

export default Banner