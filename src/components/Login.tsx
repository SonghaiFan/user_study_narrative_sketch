import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modeConfig } from "../utils/modeConfig";
import { ENABLE_DEBUG } from "../constants/debug";
import Landing from "./common/Landing";
import { useUserStatus } from "../hooks/useUserStatus";
import { createUser, checkUserExists } from "../utils/firebaseUtils";

interface LoginProps {
  onLogin: (id: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { status, setStatus } = useUserStatus();
  const navigate = useNavigate();

  // if it is debug mode, set userId to "debug" once the component is mounted
  useEffect(() => {
    if (ENABLE_DEBUG) {
      console.log("Debug mode is enabled");
      setStatus((prevStatus) => ({
        ...prevStatus,
        userId: "debug",
        isConsented: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userId = status.userId;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle debug mode
    if (ENABLE_DEBUG) {
      navigate(modeConfig["firstVisit"].nextPath);
      onLogin(userId);
      return;
    }

    // Check for Prolific ID input
    if (!userId) {
      alert("Please enter your Prolific ID");
      return;
    }

    try {
      const userExists = await checkUserExists(userId);

      if (userExists) {
        navigate(modeConfig["repeatVisit"].nextPath);
        onLogin(userId);
      } else {
        await createUser(userId);
        navigate(modeConfig["firstVisit"].nextPath);
        onLogin(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Landing handleSubmit={handleSubmit}></Landing>;
};

export default Login;
