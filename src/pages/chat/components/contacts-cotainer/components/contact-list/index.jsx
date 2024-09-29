import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { LuDot } from "react-icons/lu";

function ContactList({ contacts, isChannel = false }) {
  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleContactClick = (contact) => {
    setSelectedChatType(isChannel ? "channel" : "contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id === contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => handleContactClick(contact)}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel ? (
              <>
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover bg-black w-full h-full rounded-full"
                  />
                  <AvatarFallback
                    className={`h-10 w-10 text-lg border-[1px] bg-[#1b1c24] text-white/90 flex items-center justify-center rounded-full ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift().toLocaleUpperCase()
                      : contact.email.split("").shift().toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-row items-center">
                  <span>
                    {contact.firstName && contact.lastName
                      ? `${contact.firstName} ${contact.lastName}`
                      : `${contact.email}`}
                  </span>
                  {/* <span className="text-4xl">
                    <LuDot color="green" />
                  </span> */}
                </div>
              </>
            ): (
              <>
                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                  <AvatarFallback
                    className={`h-10 w-10 text-lg border-[1px] bg-[#1b1c24] text-white/90 flex items-center justify-center rounded-full`}
                  >
                    #
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-row items-center">
                  <span>
                    {contact.name}
                  </span>
                  {/* <span className="text-4xl">
                    <LuDot color="green" />
                  </span> */}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
