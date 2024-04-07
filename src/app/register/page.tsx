import React from 'react'
import TopHeader from '../_components/TopHeader'
import Banner from '../_components/Banner'
import Card from '../_components/Card'
import InputField from '../_components/InputField'
import Button from '../_components/Button'


function Register() {
  return (
    <div>
    <TopHeader />
    <Banner />
    <div className='flex justify-center mt-10'>
      <Card>
        <h2 className='font-semibold text-[32px] leading-10 '>Create your account</h2>
        
        <div className='py-7 text-start flex flex-col gap-5 border-b-[1px] '>
        <InputField name='name' type='text' />

          <InputField name='email' type='text' />
          <InputField name='password' type='password' />
          <Button>Create Account</Button>


        </div>

        <div className='flex justify-center mt-8 gap-2'><p className='text-secondary'>Have an Account?</p> <span className='font-medium tracking-wid uppercase '>Login</span></div>
      </Card>

    </div>
</div>
)
}

export default Register