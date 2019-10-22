import React, { Fragment } from 'react'
import Header from './routes/Header'
import Main from './routes/Main'
import './styles/common.css'
import Footer from './routes/Footer'

const App = () => (
  <Fragment>
    <Header />
    <Main />
    <Footer />
  </Fragment>
)

export default App
