import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import { set } from "react-hook-form";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { setIsUploading, setFileUploadProgress ,selectedChatType, selectedChatData, userInfo } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((message) => message + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        recipient: selectedChatData._id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (e) => {
    try{
      const file = e.target.files[0];
      console.log({file});
      if(file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
  
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFileUploadProgress(progress);
          },
        });

        console.log({response});

        if(response.status === 200 && response.data) {
          setIsUploading(false);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo._id,
              recipient: selectedChatData._id,
              content: undefined,
              messageType: "file",
              fileUrl: response.data.data.filePath,
            });
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.log(error);
    }
  }

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex flex-1 rounded-md items-center gap-5 bg-[#2a2b33]">
        <input
          type="text"
          placeholder="Enter message"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-2xl" />
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleAttachmentChange}/>
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={() => setEmojiPickerShow(true)}
        >
          <RiEmojiStickerLine className="text-2xl" />
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPickerShow}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>
        <button
          className="bg-[#8417ff] rounded-md flex items-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleSendMessage}
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
