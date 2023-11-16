import { useEffect, useState } from "react";
import Monash_Logo from "../../assets/Moansh-white-logo.svg";
import ConsentForm from "./ConsentForm";
import MarkdownRenderer from "./MarkdownRenderer";
import { FaCheck } from "react-icons/fa";
import { useUserStatus } from "../../hooks/useUserStatus";
import { Status } from "../../contexts/UserStatusContext";
interface LandingProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Landing({ handleSubmit }: LandingProps) {
  const [showConsent, setShowConsent] = useState(false);
  const { status, setStatus } = useUserStatus();
  const [inputUserId, setInputUserId] = useState(status.userId || "");

  useEffect(() => {
    if (status.userId) {
      setInputUserId(status.userId);
    }
  }, [status.userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserId(e.target.value);
    // Update the global userId in UserStatusContext
    setStatus((prevStatus) => ({ ...prevStatus, userId: e.target.value }));
  };

  const handleConsentClick = () => {
    setShowConsent(true);
  };

  const handleConsentSubmit = () => {
    setShowConsent(false);
    setStatus((prevStatus: Status) => ({
      ...prevStatus,
      isConsented: true,
    }));
  };

  const handleConsentCancel = () => {
    setShowConsent(false);
  };

  const isIdFromURL = location.search.includes("PROLIFIC_PID");

  const isLoginDisabled = !status.isConsented;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <header className="fixed sm:top-0 sm:left-0 top-20 text-white p-6 py-4">
        <h1 className="sm:text-xl text-3xl font-semibold">Pilot User Study</h1>
      </header>
      <img
        id="monash-logo"
        src={Monash_Logo}
        alt="Monash University logo"
        className="top-5 h-14 fixed "
      />
      <div className="mt-20 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-white p-8 rounded-md shadow-lg"
        >
          <label className="mb-4 text-gray-600">
            User ID:
            <input
              type="text"
              value={inputUserId}
              onChange={handleInputChange}
              className="block w-64 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              readOnly={isIdFromURL} // making it readonly if URL has the param
            />
          </label>

          <div className="my-4">
            {status.isConsented ? (
              <button
                type="button"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md flex items-center"
              >
                <FaCheck className="mr-2" />
                Consent Form Confirmed
              </button>
            ) : (
              <button
                type="button"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={handleConsentClick}
              >
                Read Consent Form
              </button>
            )}
          </div>
          {/* horizontal line */}
          <hr className="w-full my-4" />
          <button
            type="submit"
            className={`px-4 py-2 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoginDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
            }`}
            disabled={isLoginDisabled}
          >
            Login
          </button>
        </form>
      </div>
      {showConsent && (
        <ConsentForm
          handleSubmit={handleConsentSubmit}
          handleCancel={handleConsentCancel}
          isSubmitted={status.isConsented}
        >
          <MarkdownRenderer
            path="/user_study_narrative_sketch/markdown/consent.md"
            className="p-10 px-2 sm:px-20"
          />
        </ConsentForm>
      )}
    </div>
  );
}