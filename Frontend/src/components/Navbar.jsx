import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import logo from "../images/Test_Logo.png"

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="text-black bg-deco">
      <div className="flex items-center p-2">
        <Link className="hover:text-primary-green text-2xl" to="/">
          Home
        </Link>
        {user ? (
          <div className="space-x-4">
            <Link to="/survey" className="hover:text-primary-green text-2xl ml-4">
              Calculator
            </Link>
            <Link to="/chatbot" className="hover:text-primary-green text-2xl">
              EcoGuide
            </Link>
          </div>
        ) : (
          <Link to="/login" className="ml-2 hover:text-primary-green text-2xl">
            Login
          </Link>
        )}
        <div className="flex items-center ml-auto"> {/* Use ml-auto to move the image to the right */}
          <img src={logo} width="90" height="30" alt="Logo" />
          {/* <p className="text-2xl">Sustainify</p> */}
        </div>
      </div>
    </div>
  );
};
