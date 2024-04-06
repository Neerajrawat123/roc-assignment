import React from 'react'
import TopHeader from '../_components/TopHeader'
import Banner from '../_components/Banner'
import Card from '../_components/Card'
import InputField from '../_components/InputField'
import Button from '../_components/Button'


function Login() {
  return (
    <div>
        <TopHeader />
        <Banner />
        <div className='flex justify-center mt-10'>
          <Card>
            <h2 className='font-semibold text-[32px] leading-10 '>Login</h2>
            <div className='mt-6 flex flex-col gap-3'>
              <p className='font-medium text-2xl leading-7'>Welcome back to ECOMMERCE</p>
              <p className=''>The next gen business marketplace</p>

            </div>
            <div className='py-7 text-start flex flex-col gap-5 border-b-[1px] '>
              <InputField name='email' type='text' />
              <InputField name='password' type='password' />
              <Button>Login</Button>


            </div>

            <div className='flex justify-center mt-8 gap-1'><p className='text-secondary'>Don’t have an Account?</p> <span className='font-bold tracking-wid '>Sign up</span></div>
          </Card>

        </div>
    </div>
  )
}

export default Login