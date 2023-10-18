interface TaskProps {
  userId: string;
}

const Task: React.FC<TaskProps> = ({ userId }) => {
  return (
    <div className="w-1/2 m-auto mt-5">
      <h2>Task Component</h2>
      <p>User ID: {userId}</p>
      {/* ... other Task-related content or logic here */}
    </div>
  );
};

export default Task;
