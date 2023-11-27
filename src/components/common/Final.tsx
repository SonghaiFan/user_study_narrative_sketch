import { useState, useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { ENABLE_DEBUG } from "../../constants/debug";
import { useUserStatus } from "../../hooks/useUserStatus";
import { logUserFeedback, logUserEmail } from "../../utils/firebaseUtils";
import FeedbackForm from "./FeedbackForm";

const readingHabitOptions = [
  { value: 1, label: "Rarely" },
  { value: 2, label: "Occasionally" },
  { value: 3, label: "Frequently" },
  { value: 4, label: "Daily" },
];

const Final: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [readingHabit, setReadingHabit] = useState<number | null>(null);
  const { status, setStatus } = useUserStatus();
  const userId = status.userId;

  const handleFeedbackSubmit = () => {
    setIsFeedbackSubmitted(true);

    if (!ENABLE_DEBUG) {
      logUserFeedback(userId, feedback, readingHabit);
    }

    if (ENABLE_DEBUG) {
      console.log("User feedback submitted: ", userId, feedback, readingHabit);
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

  const isFeedbackAllProvided = feedback !== "" && readingHabit !== null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 ">
      <div className="flex flex-col items-center bg-white p-8 rounded-md shadow-lg w-1/3">
        {/* Feedback Section */}
        {!isFeedbackSubmitted && (
          <>
            <h1 className="text-2xl mb-4">
              Well Done! You Have Completed the Task! 🎉
            </h1>
            <FeedbackForm
              textPrompt={"Do you have any comments for this user study?"}
              textAreaLabel={
                "Is the narrative structure of the TT-graph easy to understand? Is the task easy to complete? Is there a clear narrative structure within the text? What strategies do you typically employ to interpret the narrative structure? etc."
              }
              textAreaPlaceholder={"Provide your feedback(required)..."}
              inputText={feedback}
              setInputText={setFeedback}
              inputRate={readingHabit}
              setInputRate={setReadingHabit}
              radioOptions={readingHabitOptions}
              radioLabel="How often do you read news articles?"
            />
            <hr className="w-full my-4" />
            <button
              onClick={handleFeedbackSubmit}
              className={`px-4 py-2 font-semibold text-white rounded-md ${
                isFeedbackAllProvided
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFeedbackAllProvided}
            >
              Submit Feedback
            </button>
          </>
        )}
        {/* Email Submission or Skip Section */}
        {isFeedbackSubmitted && !isEmailSubmitted && (
          <>
            <h2 className="text-2xl mb-4">Keep in touch?</h2>
            <p className="text-sm text-gray-600 block mb-2">
              If you are willing to participate in further phases of the user
              study, please provide your email:
            </p>
            <div className="flex items-center space-x-4 mb-4">
              {" "}
              {/* New div with flex layout */}
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleEmailSubmit}
                className="flex-shrink-0 px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <div className="flex items-center">
                  <FiMail className="mr-2" /> Submit Email
                </div>
              </button>
            </div>
            <hr className="w-full my-4" />
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
