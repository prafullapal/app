import React from "react";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "./components/contact-list";

const ContactsContainer = () => {
  const {directMessagesContacts, setDirectMessagesContacts} = useAppStore();

  useEffect(()=> {
    const getContacts = async () => {
      try{
        const response = await apiClient.get(GET_CONTACTS_FOR_DM_ROUTE);
        if(response.data.data) {
          setDirectMessagesContacts(response.data.data);
        }
      } catch(error) {
        console.log(error);
      }
    }

    getContacts();
  }, [])
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Direct Messages"} />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text={"Channels"} />
        </div>
      </div>
      <ProfileInfo/>
    </div>
  );
};

export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-sm">
      {text}
    </h6>
  );
};

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <h1 className="text-2xl text-white font-bold">Vartalaap</h1>
    </div>
  );
};
