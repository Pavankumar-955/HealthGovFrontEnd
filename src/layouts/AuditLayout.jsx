import React from 'react'
import Footer from '../components/ui/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'

const AuditLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
         <Navbar />
         <main className="pt-24 px-4 pb-10 sm:px-6 lg:px-8">
           <div className="mx-auto max-w-7xl">
                  <Outlet/>
           </div>
         </main>
         <Footer/>
       </div>
  )
}

export default AuditLayout