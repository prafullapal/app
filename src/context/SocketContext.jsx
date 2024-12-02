import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage, addContactsInDMContacts } = useAppStore.getState();

        if (
          (selectedChatType !== undefined &&
            selectedChatData &&
            selectedChatData._id === message.sender._id) ||
          selectedChatData._id === message.recipient._id
        ) {
            console.log("Received message", message);
            addMessage(message);
        }
        addContactsInDMContacts(message);
      };

      const handleChannelReceiveMessage = (message) => {
        const {selectedChatData, selectedChatType, addMessage, addChannelInChannelList} = useAppStore.getState();
        if(selectedChatType !== undefined && selectedChatData && selectedChatData._id === message.channelId){
          console.log("Received channel message", message);
          addMessage(message);
        }
        addChannelInChannelList(message);
      }

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleChannelReceiveMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
