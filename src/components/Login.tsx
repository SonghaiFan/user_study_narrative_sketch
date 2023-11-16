import { modeConfig } from "../utils/modeConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParam from "../utils/useQueryParam";
import { ENABLE_DEBUG } from "../constants/debug";
import Landing from "./common/Landing";
import { db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

interface LoginProps {
  onLogin: (id: string) => void;
  prolificId: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, prolificId }) => {
  const [localProlificId, setLocalProlificId] = useState(prolificId);
  const navigate = useNavigate();

  const idFromUrl = useQueryParam("PROLIFIC_PID");

  useEffect(() => {
    if (idFromUrl) {
      setLocalProlificId(idFromUrl);
    }
  }, [idFromUrl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (ENABLE_DEBUG) {
      navigate(modeConfig["firstVisit"].nextPath);
      onLogin("test");
      return;
    }

    if (!localProlificId) {
      alert("Please enter your Prolific ID");
      return;
    }

    try {
      const userDoc = doc(db, "users", localProlificId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        navigate(modeConfig["repeatVisit"].nextPath);
        onLogin(localProlificId);
      } else {
        await setDoc(userDoc, { localProlificId });
        navigate(modeConfig["firstVisit"].nextPath);
        onLogin(localProlificId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Landing
      prolificId={localProlificId}
      setProlificId={setLocalProlificId}
      handleSubmit={handleSubmit}
    ></Landing>
  );
};

export default Login;
