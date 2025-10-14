import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';

function SignUpPage() {
    const {authUser, isLoggedIn, login} = useAuthStore();
  return (
    <div>
      Sign Up Page
    </div>
  )
}

export default SignUpPage
