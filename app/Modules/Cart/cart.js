import React from 'react'
import Addtocart from './Addtocart'
import Navbar from '@/app/component/Navbar/Navbar'
import Footer from '@/app/component/Footer/Footer'

const cart = () => {
  return (
    <>
        <Navbar/>
       <Addtocart/> 
       <Footer/>
    </>
  )
}

export default cart
