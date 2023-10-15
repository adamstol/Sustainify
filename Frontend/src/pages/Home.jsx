import UserInfo from "../components/UserInfo";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from "../components/UserProfile";
import image from "../images/sustain.png";
import logo from "../images/Test_Logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
// import { getFirestore, doc, getDoc } from "firebase/firestore";

export const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { totalScore } = useParams();
  const [carbonFootPrint, setCarbonFootPrint] = useState(null);
  const [pastFootprints, setPastFootprints] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "carbonFootprints")
    )
    onSnapshot(q, (querySnapshot) => {
      const cfoots = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPastFootprints(cfoots);
    })
  })

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleButtonClick = () => {
    navigate("/login");
  }

  

  return (
    <div>
      {user ? (
        <div>
          <img className="earth" src={image} width="300" height="300" />
          <p className="action">Set Your Green Goals</p>
          <div className="profile-container mb-10">
            <div className="profile">
              <p className="my-profile">My Profile</p>
              <div className="user-container">
                <div className="user-info">
                  <img src={user.photoURL || ""} width="40" height="40" />
                  <p className="username">{user.displayName}</p>
                  <div className="button-container">
                    <button className="logout" onClick={signUserOut}>Log Out</button>
                  </div>
                </div>
              </div>
              <div className="current-status">
                {carbonFootPrint !== null ? (
                  <p className="pcarbon">
                    Your current carbon footprint is {carbonFootPrint} kg CO2e per year.
                  </p>
                ) : (
                  <p className="pcarbon">
                    Take the survey to find out your carbon footprint!
                  </p>
                )}
              </div>
              <div className="info">
                <h1 className="what">What is a carbon footprint and why should I care?</h1>
                <div className="text">
                  <p>The carbon footprint is one of the ways we measure the effects of human-induced global climate change.</p>
                  <p>To be short: it is the amount of carbon emitted by an activity or an organization.</p>
                  <p>Reducing your carbon footprint can help improve public health, boost the global economy, and maintain plant and animal diversity.</p>
                  <p>What are you waiting for? Start your green journey with us!</p>
                </div>
              </div>
              <div className="past-container">
                <p className="past">Your past carbon footprints:</p>
                <ul>
                  {pastFootprints.map((footprint) => (
                    <li className="ml-3 mt-5">{footprint.cFootprint} kg CO2e</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="flex justify-center mt-20 text-3xl font-bold">
            A Smarter and Greener Way to Save the Planet
          </p>
          <div className="flex items-center justify-center mt-5">
            <button onClick={handleButtonClick} className="mt-10 justify-center cursor-pointer transition-all bg-mountain-meadow text-white px-6 py-2 rounded-lg border-japanese-laurel border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                      Login to Start
            </button>
          </div>
          <div className="flex justify-center mt-9 items-center">
            <img className="" src={logo} width="400" height="400" alt="Logo" />
          </div>
        </div>
      )}
    </div>
  );
};
