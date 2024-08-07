'use client'
import React, {  useRef } from 'react'

function InputField({name, type}:{name:string, type:string}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if(inputRef?.current?.getAttribute('type') === 'password'){
      inputRef?.current?.setAttribute('type', 'text')
    }else{
      inputRef?.current?.setAttribute('type', 'password')
    }
  }
  return (
    <div className='flex flex-col gap-1'>
        <label className='capitalize' htmlFor={name}>{name}</label>
        <div className='w-full relative'>
            <input className='w-[380px] border rounded-md px-4 py-[10px]' ref={inputRef}
             type={type} name={name} placeholder ='Enter' required/>
            {type === 'password' && <button onClick={() => handleClick()} className='underline absolute right-3 bottom-3'>Show</button>}
        </div>
    </div>
  )
}

export default InputField