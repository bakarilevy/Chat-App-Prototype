import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';

function LoginPage() {
    const {authUser, isLoggedIn, login} = useAuthStore();
  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage
