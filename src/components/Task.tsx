import React from "react";
import userSchemas from "../content/userSchema.json";

interface TaskProps {
  userId: string;
}

const Task: React.FC<TaskProps> = ({ userId }) => {
  const user = userSchemas.find((userSchema) => userSchema.userId === userId);

  return (
    <div className="absolute inset-0 m-4 mt-20 bg-green-100">
      <div className="flex flex-col items-center justify-center h-full">
        {user ? (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <p>No user found with this ID</p>
        )}
      </div>
    </div>
  );
};

export default Task;
