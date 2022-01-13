import { useState, useEffect } from "react";

type useWindowHeightType = {
  height: number;
};

function useWindowHeight(): useWindowHeightType {
  const isClient: boolean = typeof window === "object";

  function getHeight() {
    return {
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowHeight, setWindowHeight] = useState(getHeight);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowHeight(getHeight());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
}

export default useWindowHeight;
