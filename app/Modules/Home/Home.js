import Navbar from '@/app/component/Navbar/Navbar'
import React from 'react'
import Herosection from "../Home/Herosection.js"
import Footer from '@/app/component/Footer/Footer.js'
import Categories from './Categories.js'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Herosection/>
    <Categories/>
    <Footer/>
      
    </>
  )
}

export default Home
