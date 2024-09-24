import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { toast } from "sonner";
import { USER_INFO_ROUTE } from "./utils/constants";

function ProtectedRoutes({ children }) {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const isAuthenticated = userInfo && userInfo.email;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

function AuthRoute({ children }) {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const isAuthenticated = !!userInfo;

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : children;
}

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    const getUserData = async ()  => {
      try{
        const response = await apiClient.get(USER_INFO_ROUTE);
        if(response.status === 200 && response.data.data) {
          setUserInfo({...response.data.data});
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if(!userInfo){
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute>
          <Auth />
        </AuthRoute>
      ),
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoutes>
          <Chat />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      ),
    },
  ]);

  if(loading) {
    return <div>Loading...</div>
  }

  return <RouterProvider router={router} />;
}

export default App;
