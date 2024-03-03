import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(pros) {
if(localStorage.getItem('userToken')){
return pros.children
}else{
return<Navigate to={'/login'}></Navigate>
}
 
}
