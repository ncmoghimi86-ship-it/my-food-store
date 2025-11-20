import React from 'react'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import CardPage from './pages/CardPage'
import Header from './component/Header'
import CheckoutPage from './pages/CheckoutPage'
import {  BrowserRouter as Router,Routes,Route ,Navigate } from 'react-router-dom'
import {Layout} from 'antd'
import PrivetRout from './component/PrivetRout'

const {Content}=Layout
function App() {
  return (
    <Router>
       <Layout className='layout'>
         <Header />
         <Content>
          <Routes>
           <Route path="/" element={<ProductPage/>} />
           <Route path="/cart" element={<CardPage/>} />
           <Route path="/dashboard"  element={ <Dashboard/>} 
           />
           <Route path="/login" element={<LoginPage/>} />
           <Route path="/register" element={<RegisterPage/>} />

           <Route path="/checkout"
           element={
            <PrivetRout>
              <CheckoutPage/>
            </PrivetRout>
           } 
           />
            <Route path="*" element={<Navigate to='/' replace/>} />
          </Routes>
          </Content>
     
       </Layout>
    </Router>
  )
}

export default App
