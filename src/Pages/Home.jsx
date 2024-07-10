import React from 'react'
import Header from '../Components/Header'
import Content from '../Components/Content'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
        <Header />
        <div className="bg-[#646669] px-2 py-5 h-screen"><Outlet/></div>
    </>
  )
}

export default Home