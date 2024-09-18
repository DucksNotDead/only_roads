import { ReactNode, useContext, JSX } from "react";
import { deviceContext } from "../model/const/deviceContext";

interface IProps {
  children: ReactNode;
}

export function MobileView({ children }: IProps) {
  const { isMobile } = useContext(deviceContext);

  return (isMobile ? children : null) as JSX.Element;
}
