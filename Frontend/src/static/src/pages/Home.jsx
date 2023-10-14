import UserInfo from "../components/UserInfo";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../components/UserProfile";
import image from "../images/save-the-world.png";
import logo from "../images/Test_Logo.png";
import { useState } from "react";

export const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  
  return (
    <div>
        <div className="mt-2 ml-7 flex">
  <div className="w-1/2"> {/* Left column */}
    <div className="mt-10 text-4xl font-bold">Track your progress towards a greener future.</div>
  </div>
  <div className="w-1/2"> {/* Right column */}
    {user ? (
      <div>
         <div class="bg-white w-48 h-64 rounded-lg">
          <div class="mt-9 flex p-2 gap-1">
            <div class="">
              <span class="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
              <span class="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
              <span class="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
            </div>
          </div>
          <div class="card__content">
            <div className="flex items-center mt-12">
            <img src={auth.currentUser?.photoURL || ""} width="40" height="40" />
            <p className="ml-5">{auth.currentUser?.displayName}</p>
            </div>
            <button className="mt-6" onClick={signUserOut}>
            Log Out
            </button>
          </div>
        </div>
        <div className="bg-white p-4 mt-4 border border-black rounded-lg">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <p>Your current carbon footprint: 1000 kg CO2</p>
        </div>
      </div>
    ) : (
      <div className="text-center pt-12">
        <p className="text-2xl font-bold">Log in to start your eco-journey with us.</p>
        <div className="flex justify-center mt-9 items-center">
          <img className="" src={logo} width="400" height="400" alt="Logo" />
        </div>
      </div>
    )}
  </div>
</div>

      {/* <div className="mt-2 ml-7">
        {user ? ( // Check if the user is logged in
          <div>
            <div className="text-2xl mt-6">
                Track your progress towards a greener future.
            </div>
            <div className="flex items-center mt-12">
              <img src={auth.currentUser?.photoURL || ""} width="40" height="40" />
              <p className="ml-5">{auth.currentUser?.displayName}</p>
            </div>
            <button className="mt-6" onClick={signUserOut}>
              Log Out
            </button>
            <div className=" mr-8 bg-white p-4 mt-4 border border-black rounded-lg">
              <h2 className="text-xl font-semibold mb-2">My Profile</h2>
              <p>Your current carbon footprint: 1000 kg C02</p>
            </div>
            <div class="bg-white w-48 h-64 rounded-lg">
            <div class="mt-9 flex p-2 gap-1">
                <div class="">
                <span class="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
                </div>
                <div class="circle">
                <span class="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
                </div>
                <div class="circle">
                <span class="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
                </div>
            </div>
            <div class="card__content">
                <h2 class="text-2xl font-bold">What exactly is a carbon footprint?</h2>
            </div>
            </div>

          </div>
        ) : (
          <div className="text-center pt-12">
            <p className="text-2xl font-bold">Log in to start your eco-journey with us.</p>
            <div className="flex justify-center mt-9 items-center">
              <img className="" src={logo} width="400" height="400" alt="Logo" />
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};
