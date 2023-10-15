import React from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const UserInfo = () => {
    
  return (
    <div className="flex items-center mt-12">
      <img src={auth.currentUser?.photoURL || ""} width="40" height="40" />
      <p className="ml-5">{auth.currentUser?.displayName}</p>
    </div>
  );
};

export default UserInfo;
