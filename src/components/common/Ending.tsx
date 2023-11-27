import { ENABLE_DEBUG } from "../../constants/debug";

const Ending = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl  mb-4">Thank You for Your Participation!</h2>
        <p className="text-sm text-gray-600 mt-4">
          Your valuable contribution is instrumental in delving into the nuances
          and narratives of news stories. Please note, your results will undergo
          a manual review for approval. Thank you for your understanding and
          your time. 🙏
        </p>
        <p className="text-lg mt-4">
          Click to obtain{" "}
          <a
            href="https://app.prolific.com/submissions/complete?cc=CAAXOZX6"
            className="font-bold text-blue-500 underline"
          >
            🔗 Complete Code
          </a>
        </p>
        <p className="text-lg mt-4">
          <strong>Now you can now safely close the window.</strong>
        </p>

        <hr className="w-full my-4" />
        <p className="text-sm text-gray-600 mt-4">
          If you have any questions, please contact the researcher{" "}
          <a
            className="text-green-500 font-bold underline"
            href="mailto:songhai.fan@monash.edu"
          >
            Songhai Fan
          </a>
          .
        </p>
        {ENABLE_DEBUG && (
          <button
            onClick={handleReset}
            className="flex items-center justify-center mt-4 px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Ending;
