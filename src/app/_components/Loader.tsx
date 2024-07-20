import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">

    <ColorRing
      visible={true}
      height="160"
      width="160"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
            </div>  )
}

export default Loader