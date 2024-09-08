import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />
    },
    {
      path: '/chat',
      element: <Chat/>

    }, {
      path: "/profile",
      element: <Profile/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
