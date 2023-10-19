import { modeConfig } from "../modeConfig";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ENABLE_DEBUG } from "../constants/debug";
import Landing from "./common/Landing";
import { db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

function useProlificId() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("PROLIFIC_PID");
}

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
    <Landing
      prolificId={prolificId}
      setProlificId={setProlificId}
      handleSubmit={handleSubmit}
    ></Landing>
  );
};

export default Login;
