import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useRoute = () => {
  const location = useLocation();
  const queryUrl = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  return {
    location,
    queryUrl,
  };
};

export default useRoute;
