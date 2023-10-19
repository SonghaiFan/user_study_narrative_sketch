import { useLocation } from "react-router-dom";

function useProlificId() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("PROLIFIC_PID");
}

export default useProlificId;
