import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Tabs from '../Components/Tabs/Tabs'

function Home() {
  return (
    <>
        <Header />
        <Tabs />
        <div className="bg-[#46484a] px-2 py-5 min-h-screen"><Outlet/></div>
    </>
  )
}

export default Home