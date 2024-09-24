import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 bordrer-[#2f303b] flex items-center justify-between px-20">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              <AvatarImage
                src={`${HOST}/${selectedChatData.image}`}
                alt="profile"
                className="object-cover bg-black w-full h-full"
              />
              <AvatarFallback
                className={`h-12 w-12 text-lg border-[1px] bg-[#1b1c24] text-white/90 flex items-center  justify-center  rounded-full ${getColor(
                  selectedChatData.color
                )}`}
              >
                {selectedChatData.firstName
                  ? selectedChatData.firstName
                      .split("")
                      .shift()
                      .toLocaleUpperCase()
                  : selectedChatData.email
                      .split("")
                      .shift()
                      .toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            {selectedChatType === "contact" && (
              <>
                <span>
                  {selectedChatData.firstName && selectedChatData.lastName
                    ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                    : `${selectedChatData.email}`}
                </span>
                <span className="text-xs">{selectedChatData.email}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:bordr-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
