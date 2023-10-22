import Monash_Logo from "../../assets/Moansh-white-logo.svg";

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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <header className="fixed sm:top-0 sm:left-0 top-20 text-white p-6 py-4">
        <h1 className="sm:text-xl text-3xl font-semibold">Pilot User Study</h1>
      </header>
      <div className="mt-20">
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
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
      <img
        src={Monash_Logo}
        alt="Monash University logo"
        className="top-5 h-10 fixed "
      />
    </div>
  );
}
