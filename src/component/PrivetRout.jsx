import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivetRout({children}) {
    const  isLogin=useSelector((state)=>state.autho.isLogin)
    if(!isLogin){
        return <Navigate to='/login' replace/>
    }
    return children
  
}

export default PrivetRout