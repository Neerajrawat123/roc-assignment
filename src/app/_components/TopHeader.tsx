import React from 'react'

function TopHeader() {
  return (
    <div className='bg-primary  '>

    <div className='flex justify-end text-secondary '>
            <div className=' py-2  px-10'>
                <ul className='flex text-xs gap-5'>
                    <li>Help</li>        
                    <li>Orders & Returns</li>
                    <li>Hi, John</li>


                </ul>

            </div>
    </div>

    <div className='pl-10 pb-2 pr-8'>
      <div className='flex justify-between items-center'>
        <div className='font-bold text-3xl'>
          <span className='uppercase'>ecommerce</span>
        </div>
        <div>
          <ul className='flex gap-8 font-semibold pr-6'>
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New stock</li>
            <li>Trending</li>
          </ul>
        </div>
        <div className='flex gap-8 pl-6'>
          <img src="/images/search.svg" alt="" />
          <img src="/images/cart.svg" alt="" />

        </div>
      </div>
    </div>
    </div>

  )
}

export default TopHeader