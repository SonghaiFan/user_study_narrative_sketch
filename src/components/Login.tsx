import React, { useState, useEffect } from "react";
import userSchemas from "../content/userSchema.json";

const Login: React.FC<{ onLogin: (userId: string) => void }> = ({
  onLogin,
}) => {
  const [userId, setUserId] = useState("");
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const user = userSchemas.find((user) => user.userId === userId);
    setUserExists(!!user);
  }, [userId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userExists) {
      onLogin(userId);
    } else {
      alert("User ID does not exist");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <header className="fixed top-0 left-0 right-0  text-white p-6 py-4">
        <h1 className="text-xl font-semibold">User study</h1>
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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="block w-64 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
    </div>
  );
};

export default Login;
