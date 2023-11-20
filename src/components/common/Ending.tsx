import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { ENABLE_DEBUG } from "../../constants/debug";
import { useUserStatus } from "../../hooks/useUserStatus";
import { logUserFeedback, logUserEmail } from "../../utils/firebaseUtils";

const Ending: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const { status } = useUserStatus();
  const userId = status.userId;

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedback(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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

  const handleEmailSubmit = () => {
    setIsEmailSubmitted(true);

    if (!ENABLE_DEBUG) {
      logUserEmail(userId, email);
    }

    if (ENABLE_DEBUG) {
      console.log("User email submitted: ", email);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-blue-500">
      <div className="flex flex-col items-center bg-white p-8 rounded-md shadow-lg">
        {!isFeedbackSubmitted && (
          <h1 className="text-3xl mb-4">
            Well Done! You Have Completed the Task!
          </h1>
        )}

        {/* Feedback Section */}
        {!isFeedbackSubmitted && (
          <>
            <h2 className="text-2xl mb-4">Final Feedback</h2>
            <ul className="text-lg list-disc m-4">
              <li>
                {" "}
                Could you share your thoughts on how the graph aided your
                understanding of the narrative?{" "}
              </li>
              <li>
                {" "}
                In your opinion, is there a clear narrative structure within the
                text?{" "}
              </li>{" "}
              <li>
                {" "}
                What strategies do you typically employ to interpret the
                narrative structure?{" "}
              </li>
            </ul>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4  overflow-auto resize-none"
            />
            <button
              onClick={handleFeedbackSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Feedback
            </button>
          </>
        )}

        {/* Thank You and Complete Code Section */}
        {isFeedbackSubmitted && !isEmailSubmitted && (
          <>
            <h1 className="text-3xl  mb-4">Thank You for Your Feedback!</h1>
            <p className="text-lg mb-4">
              Your valuable contribution is instrumental in delving into the
              nuances and narratives of news stories.
            </p>
            <p className="text-lg mb-4">
              To obtain the complete code, please click on the following
              Redirect URL:
              <a
                href="https://app.prolific.com/submissions/complete?cc=CAAXOZX6"
                className="text-blue-500 underline"
              >
                Complete Code
              </a>{" "}
              🔗
            </p>
          </>
        )}

        {/* Email Submission Section */}
        {isFeedbackSubmitted && !isEmailSubmitted && (
          <>
            <h2 className="text-2xl mb-4">Last Words</h2>
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
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center"
            >
              <FiMail className="mr-2" /> Submit Email
            </button>
          </>
        )}

        {/* Final Message Section */}
        {isEmailSubmitted && (
          <>
            {" "}
            <h1 className="text-3xl  mb-4">
              {" "}
              Thank You for Your Participation! 🎉
            </h1>
            <p className="text-lg mt-4">
              We'll let you know when we move to the next phase. Keep in touch
              and see you in the future!
            </p>
            <p className="text-lg mt-4">
              Now you can safely log out or close the page.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Ending;
