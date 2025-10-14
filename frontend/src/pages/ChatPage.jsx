import { useAuthStore } from '../store/useAuthStore.js';


function ChatPage() {
    const {logout} = useAuthStore();

  return (
    <div className='z-10'>
      Chat Page
      <button type='submit' onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage
