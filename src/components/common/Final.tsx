import { useState, useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { ENABLE_DEBUG } from "../../constants/debug";
import { useUserStatus } from "../../hooks/useUserStatus";
import { logUserFeedback, logUserEmail } from "../../utils/firebaseUtils";

const Final: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const { status, setStatus } = useUserStatus();
  const userId = status.userId;

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    setIsFeedbackSubmitted(true);

    if (!ENABLE_DEBUG) {
      logUserFeedback(userId, feedback);
    }

    if (ENABLE_DEBUG) {
      console.log("User feedback submitted: ", feedback);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSkipEmail = () => {
    setIsEmailSubmitted(true);
  };

  const handleEmailSubmit = () => {
    setIsEmailSubmitted(true);

    if (!ENABLE_DEBUG) {
      logUserEmail(userId, email);
    }

    if (ENABLE_DEBUG) {
      console.log("User email submitted: ", email);
    }
  };

  // Update user status
  useEffect(() => {
    if (isEmailSubmitted) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        isFinished: true,
      }));
    }
  }, [isEmailSubmitted, setStatus]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 ">
      <div className="flex flex-col items-center bg-white p-8 rounded-md shadow-lg w-1/3">
        {/* Feedback Section */}
        {!isFeedbackSubmitted && (
          <>
            <h1 className="text-2xl mb-4">
              Well Done! You Have Completed the Task! 🎉
            </h1>
            <hr className="w-full my-4" />
            <h2 className="text-xl mb-4">Final Feedback</h2>
            <ul className=" text-sm text-gray-600 mt-4 list-disc m-4">
              In your opinion,
              <li>
                Is the narrative structure of the TT-graph easy to understand?
                Or is the predefined structure of the TT-graph make sense to you
                in traning phase?
              </li>
              <li>Is there a clear narrative structure within the text?</li>
              <li>
                What strategies do you typically employ to interpret the
                narrative structure?
              </li>
            </ul>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4  overflow-auto resize-none"
            />
            <button
              onClick={handleFeedbackSubmit}
              className={`px-4 py-2 font-semibold text-white rounded-md ${
                feedback !== ""
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={feedback === ""}
            >
              Submit Feedback
            </button>
          </>
        )}
        {/* Email Submission or Skip Section */}
        {isFeedbackSubmitted && !isEmailSubmitted && (
          <>
            <h2 className="text-2xl mb-4">Keep in touch?</h2>
            <p className="text-lg mb-4">
              If you are willing to participate in further phases of the user
              study, please provide your email:
            </p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-1/2 p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              onClick={handleEmailSubmit}
              className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <FiMail className="mr-2" /> Submit Email
            </button>
            <button
              onClick={handleSkipEmail}
              className="flex items-center justify-center mt-4 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              No Thanks, show me the complete code.
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Final;
