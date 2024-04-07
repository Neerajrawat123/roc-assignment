import { Span } from 'next/dist/trace'
import React from 'react'

function InputField({name, type}:{name:string, type:string}) {
  return (
    <div className='flex flex-col gap-1'>
        <label className='capitalize' htmlFor={name}>{name}</label>
        <div className='w-full relative'>
            <input className='w-[380px] border rounded-md px-4 py-[10px]' type={type} name={name} placeholder ='Enter' />
            {type === 'password' && <span className='underline absolute right-3 bottom-3'>Show</span>}
        </div>
    </div>
  )
}

export default InputField