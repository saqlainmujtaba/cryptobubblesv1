import React from 'react'
import D3Bubbles from './Components/D3Bubbles'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Table from './Components/Table'
import CryptoCurrencies from './Components/Table2'

const App = () => {
  return (
    <>
      <Header/>
      <D3Bubbles/>
      {/* <Table/> */}
      <CryptoCurrencies/>
      <Footer/>
    </>
  )
}

export default App