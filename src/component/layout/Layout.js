import React from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({children}) {
  return (
    <div className='container-fluid p-0 m-0'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
