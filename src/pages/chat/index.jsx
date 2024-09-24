import { useAppStore } from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-cotainer';
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';

export default function Chat() {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup) {
      toast.error('Please complete your profile setup');
      navigate('/profile');
    }
  }, [userInfo]);
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      <ChatContainer />
    </div>
  )
}
