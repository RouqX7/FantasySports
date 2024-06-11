import React from 'react'
import FormLogin from '../components/FormLogin'
function Login() {
    return  <FormLogin route = "api/token/" method='login' />
}

export default Login