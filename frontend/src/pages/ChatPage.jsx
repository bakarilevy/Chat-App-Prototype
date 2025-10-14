import { useAuthStore } from '../store/useAuthStore.js';

function ChatPage() {
    const {authUser, isLoggedIn, login} = useAuthStore();
  return (
    <div>
      Chat Page
    </div>
  )
}

export default ChatPage
