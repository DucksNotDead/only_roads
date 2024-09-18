import { ReactNode, useEffect, useMemo, useState } from "react";
import { deviceContext } from "feature/DeviceProvider";

interface IProps {
  children: ReactNode;
}

export function DeviceProvider({ children }: IProps) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = useMemo(() => width <= 768, [width]);

  return (
    <deviceContext.Provider value={{ isMobile }}>
      {children}
    </deviceContext.Provider>
  );
}
