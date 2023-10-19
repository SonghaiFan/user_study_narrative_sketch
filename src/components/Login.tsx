import Monash_Logo from "../../src/assets/Moansh-white-logo.svg";
import { modeConfig } from "../modeConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProlificId from "../utils/useProlificId";
import { ENABLE_DEBUG } from "../constants/debug";

import { db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const Login: React.FC<{ onLogin: (id: string) => void }> = ({ onLogin }) => {
  const [prolificId, setProlificId] = useState("");
  const navigate = useNavigate();

  const idFromUrl = useProlificId();

  useEffect(() => {
    if (idFromUrl) {
      setProlificId(idFromUrl);
    }
  }, [idFromUrl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (ENABLE_DEBUG) {
      navigate(modeConfig["firstVisit"].nextPath);
      onLogin("test");
      return;
    }

    if (!prolificId) {
      console.error("Prolific ID is not defined!");
      return;
    }
    try {
      const userDoc = doc(db, "users", prolificId);
      const userSnapshot = await getDoc(userDoc);

      console.log(userSnapshot.data());

      if (userSnapshot.exists()) {
        navigate(modeConfig["repeatVisit"].nextPath);
        onLogin(prolificId);
      } else {
        await setDoc(userDoc, { prolificId });
        navigate(modeConfig["firstVisit"].nextPath);
        onLogin(prolificId);
      }
    } catch (error) {
      console.log(error);
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
        className="top-5 h-[60px] fixed"
      />
    </div>
  );
};

export default Login;
