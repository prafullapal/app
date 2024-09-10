import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor, SETUP_PROFILE_ROUTE } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

export default function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [hovered, setHovered] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(0);

  useEffect(() => { 
    if(userInfo.profilSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if(!firstName || !lastName) {
      toast.error("First Name and Last Name are required");
      return false;
    }
    return true;
  };
  const saveChanges = async () => {
    if(validateProfile()) {
      try {
        const response = await apiClient.post(SETUP_PROFILE_ROUTE, {
          firstName,
          lastName,
          color: selectedColor,
        });

        if(response.status === 200 && response.data) {
          setUserInfo({...response.data})
          toast.success("Profile updated successfully");
          navigate("/chat");
        }

      } catch (error) {
        console.error(error);
        
      }
    }
    console.log("Saving changes");
  };

  const handleBackBtn = (e) => {
    e.preventDefault();
    if(userInfo.profilSetup)
    navigate("/chat");
    else
    toast.error("Please complete your profile setup");
  }

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleBackBtn}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              <AvatarImage
                src={image}
                alt="profile"
                className="object-cover bg-black w-full h-full"
              />
              <AvatarFallback
                className={`h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] bg-[#1b1c24] text-white/90 flex items-center  justify-center  rounded-full ${getColor(
                  selectedColor
                )}`}
              >
                {firstName
                  ? firstName.split("").shift().toLocaleUpperCase()
                  : userInfo.email.split("").shift().toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                type="email"
                placeholder="Email"
                disabled
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                value={userInfo.email}
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder="First Name"
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder="Last Name"
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`h-8 w-8 rounded-full ${color} cursor-pointer transition-all duration-300
                  ${selectedColor === index ? "ring-2 ring-white" : ""}`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
