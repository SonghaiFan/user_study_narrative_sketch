import { useLocation } from "react-router-dom";

export default function useQueryParam(paramName: string) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(paramName);
}
