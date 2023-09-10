import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Assuming you also have Firestore set up in firebase.js
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation and URL parameter extraction
import Monash_Logo from "../../public/Monash_ EV_logo_white.svg";

const Login: React.FC<{ onLogin: (id: string) => void }> = ({ onLogin }) => {
  const [prolificId, setProlificId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const idFromUrl = urlParams.get("PROLIFIC_PID");
    if (idFromUrl) {
      setProlificId(idFromUrl);
    }
  }, [location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prolificId) {
      console.error("Prolific ID is not defined!");
      return; // exit from the function or handle this case appropriately
    }
    // Check if the Prolific ID already exists in Firestore
    try {
      const userDoc = doc(db, "users", prolificId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        navigate("/more");
        onLogin(prolificId); // Ensure the state in App is updated
      } else {
        await setDoc(userDoc, { prolificId });
        navigate("/home");
        onLogin(prolificId);
      }
    } catch (error) {
      console.log(error);
      // Display an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <header className="fixed top-0 left-0 right-0 text-white p-6 py-4">
        <h1 className="text-xl font-semibold">User study</h1>
      </header>
      <div className="mt-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-white p-8 rounded-md shadow-lg"
        >
          <label className="mb-4 text-gray-600">
            Prolific ID:
            <input
              type="text"
              value={prolificId}
              onChange={(e) => setProlificId(e.target.value)}
              className="block w-64 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              readOnly={location.search.includes("PROLIFIC_PID")} // making it readonly if URL has the param
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
      <img
        src={Monash_Logo}
        alt="Monash University logo"
        className="top-0 h-1/6 fixed"
      />
    </div>
  );
};

export default Login;
