import { useState } from "react";

const useWatchMore = (maxLength) => {
  const [max, setMax] = useState(maxLength);

  const handleSetMax = () => {
    setMax(max + maxLength);
  };

  const resetMax = () => {
    setMax(max);
  };

  return { max, handleSetMax, resetMax };
};

export default useWatchMore;
