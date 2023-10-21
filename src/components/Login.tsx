import { modeConfig } from "../utils/modeConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParam from "../utils/useQueryParam";
import { ENABLE_DEBUG } from "../constants/debug";
import Landing from "./common/Landing";
import { db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const Login: React.FC<{ onLogin: (id: string) => void }> = ({ onLogin }) => {
  const [prolificId, setProlificId] = useState("");
  const navigate = useNavigate();

  const idFromUrl = useQueryParam("prolificId");

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
      alert("Please enter your Prolific ID");
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
