import React from 'react'
import loader from "./assets/loader.gif"

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center mt-52'>
    <img src={loader} alt='loading...' className=''></img>
    <h1 className='font-bold text-2xl text-white mx-8'>Detecting Your Location</h1>
    <p className='text-1xl mt-2 mx-8 text-white'>Need access to your location to calculate real-time weather</p>
    </div>
  )
}
