import { useState } from "react";
import Monash_Logo from "../../assets/Moansh-white-logo.svg";
import ConsentForm from "./ConsentForm";
import MarkdownRenderer from "./MarkdownRenderer";
import { FaCheck } from "react-icons/fa";

interface LandingProps {
  prolificId: string;
  setProlificId: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Landing({
  prolificId,
  setProlificId,
  handleSubmit,
}: LandingProps) {
  const [showConsent, setShowConsent] = useState(false);
  const [consentSigned, setConsentSigned] = useState(false);

  const handleConsentClick = () => {
    setShowConsent(true);
  };

  const handleConsentSubmit = () => {
    setShowConsent(false);
    setConsentSigned(true);
  };

  const handleConsentCancel = () => {
    setShowConsent(false);
  };

  const isLoginDisabled = !consentSigned;

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
              value={prolificId}
              onChange={(e) => setProlificId(e.target.value)}
              className="block w-64 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              readOnly={location.search.includes("PROLIFIC_PID")} // making it readonly if URL has the param
            />
          </label>

          <div className="my-4">
            {consentSigned ? (
              <button
                type="button"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
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
          isSubmitted={consentSigned}
        >
          <MarkdownRenderer
            path="/user_study_narrative_sketch/markdown/home.md"
            className="p-10 px-2 sm:px-20"
          />
        </ConsentForm>
      )}
    </div>
  );
}
